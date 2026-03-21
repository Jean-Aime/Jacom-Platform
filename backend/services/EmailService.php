<?php
require_once __DIR__ . '/../config/database.php';

class EmailService {
    private $db;
    private $conn;
    private $fromEmail = 'noreply@jacom-platform.com';
    private $fromName = 'JACOM Training Platform';
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    /**
     * Send enrollment confirmation email
     */
    public function sendEnrollmentConfirmation($userId, $courseId, $enrollmentId) {
        try {
            // Get user and course details
            $stmt = $this->conn->prepare("
                SELECT u.name, u.email, c.name as courseName, c.startDate, c.duration
                FROM user u, courses c
                WHERE u.id = ? AND c.id = ?
            ");
            $stmt->execute([$userId, $courseId]);
            $data = $stmt->fetch();
            
            if (!$data) {
                return false;
            }
            
            $to = $data['email'];
            $subject = "Enrollment Request Received - {$data['courseName']}";
            
            $message = $this->getEnrollmentConfirmationTemplate(
                $data['name'],
                $data['courseName'],
                $data['startDate'],
                $data['duration'],
                $enrollmentId
            );
            
            return $this->sendEmail($to, $subject, $message);
        } catch (Exception $e) {
            error_log("Email error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Send enrollment approval email
     */
    public function sendEnrollmentApproval($enrollmentId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT u.name, u.email, c.name as courseName, c.slug, c.startDate
                FROM enrollments e
                JOIN user u ON e.userId = u.id
                JOIN courses c ON e.courseId = c.id
                WHERE e.id = ?
            ");
            $stmt->execute([$enrollmentId]);
            $data = $stmt->fetch();
            
            if (!$data) {
                return false;
            }
            
            $to = $data['email'];
            $subject = "Enrollment Approved - {$data['courseName']}";
            
            $message = $this->getEnrollmentApprovalTemplate(
                $data['name'],
                $data['courseName'],
                $data['slug'],
                $data['startDate']
            );
            
            return $this->sendEmail($to, $subject, $message);
        } catch (Exception $e) {
            error_log("Email error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Send payment receipt email
     */
    public function sendPaymentReceipt($paymentId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT p.amount, p.method, p.reference, p.createdAt,
                       u.name, u.email, c.name as courseName,
                       e.amountPaid, e.totalAmount
                FROM payments p
                JOIN enrollments e ON p.enrollmentId = e.id
                JOIN user u ON e.userId = u.id
                JOIN courses c ON e.courseId = c.id
                WHERE p.id = ?
            ");
            $stmt->execute([$paymentId]);
            $data = $stmt->fetch();
            
            if (!$data) {
                return false;
            }
            
            $to = $data['email'];
            $subject = "Payment Receipt - {$data['courseName']}";
            
            $message = $this->getPaymentReceiptTemplate(
                $data['name'],
                $data['courseName'],
                $data['amount'],
                $data['method'],
                $data['reference'],
                $data['amountPaid'],
                $data['totalAmount'],
                $data['createdAt']
            );
            
            return $this->sendEmail($to, $subject, $message);
        } catch (Exception $e) {
            error_log("Email error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Send assignment due reminder
     */
    public function sendAssignmentReminder($assignmentId, $userId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT u.name, u.email, a.title, a.dueDate, c.name as courseName
                FROM user u, assignments a, courses c
                WHERE u.id = ? AND a.id = ? AND a.courseId = c.id
            ");
            $stmt->execute([$userId, $assignmentId]);
            $data = $stmt->fetch();
            
            if (!$data) {
                return false;
            }
            
            $to = $data['email'];
            $subject = "Assignment Due Soon - {$data['title']}";
            
            $message = $this->getAssignmentReminderTemplate(
                $data['name'],
                $data['title'],
                $data['courseName'],
                $data['dueDate']
            );
            
            return $this->sendEmail($to, $subject, $message);
        } catch (Exception $e) {
            error_log("Email error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Send certificate completion email
     */
    public function sendCertificateEmail($certificateId) {
        try {
            $stmt = $this->conn->prepare("
                SELECT u.name, u.email, c.name as courseName, cert.certificateNumber, cert.pdfUrl
                FROM certificates cert
                JOIN user u ON cert.userId = u.id
                JOIN courses c ON cert.courseId = c.id
                WHERE cert.id = ?
            ");
            $stmt->execute([$certificateId]);
            $data = $stmt->fetch();
            
            if (!$data) {
                return false;
            }
            
            $to = $data['email'];
            $subject = "Congratulations! Course Completed - {$data['courseName']}";
            
            $message = $this->getCertificateTemplate(
                $data['name'],
                $data['courseName'],
                $data['certificateNumber'],
                $data['pdfUrl']
            );
            
            return $this->sendEmail($to, $subject, $message);
        } catch (Exception $e) {
            error_log("Email error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Core email sending function
     */
    private function sendEmail($to, $subject, $htmlMessage) {
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: {$this->fromName} <{$this->fromEmail}>" . "\r\n";
        $headers .= "Reply-To: {$this->fromEmail}" . "\r\n";
        
        // For production, integrate with SendGrid, AWS SES, or other email service
        // For now, using PHP mail() function
        return mail($to, $subject, $htmlMessage, $headers);
    }
    
    // ============================================================================
    // EMAIL TEMPLATES
    // ============================================================================
    
    private function getEnrollmentConfirmationTemplate($name, $courseName, $startDate, $duration, $enrollmentId) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #c00; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .button { background: #c00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Enrollment Request Received</h1>
                </div>
                <div class='content'>
                    <p>Dear {$name},</p>
                    <p>Thank you for your interest in enrolling in <strong>{$courseName}</strong>!</p>
                    <p><strong>Enrollment Details:</strong></p>
                    <ul>
                        <li>Course: {$courseName}</li>
                        <li>Duration: {$duration}</li>
                        <li>Start Date: {$startDate}</li>
                        <li>Enrollment ID: {$enrollmentId}</li>
                    </ul>
                    <p>Your enrollment request has been submitted and is currently <strong>pending approval</strong>.</p>
                    <p>Our admin team will review your request and notify you once it's approved. You'll receive payment instructions and course access details via email.</p>
                    <a href='http://localhost:3000/training/dashboard' class='button'>View Dashboard</a>
                    <p>If you have any questions, please contact us at support@jacom-platform.com</p>
                </div>
                <div class='footer'>
                    <p>&copy; 2026 JACOM Training Platform. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
    
    private function getEnrollmentApprovalTemplate($name, $courseName, $courseSlug, $startDate) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #28a745; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .button { background: #c00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
                .success-badge { background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🎉 Enrollment Approved!</h1>
                </div>
                <div class='content'>
                    <p>Dear {$name},</p>
                    <p><span class='success-badge'>APPROVED</span></p>
                    <p>Great news! Your enrollment in <strong>{$courseName}</strong> has been approved!</p>
                    <p><strong>Course Details:</strong></p>
                    <ul>
                        <li>Course: {$courseName}</li>
                        <li>Start Date: {$startDate}</li>
                        <li>Status: <strong>Approved</strong></li>
                    </ul>
                    <p><strong>Next Steps:</strong></p>
                    <ol>
                        <li>Complete your payment (if not already done)</li>
                        <li>Access your course dashboard</li>
                        <li>Start learning immediately!</li>
                    </ol>
                    <a href='http://localhost:3000/training/course/{$courseSlug}' class='button'>Access Course Now</a>
                    <p>We're excited to have you in our learning community!</p>
                </div>
                <div class='footer'>
                    <p>&copy; 2026 JACOM Training Platform. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
    
    private function getPaymentReceiptTemplate($name, $courseName, $amount, $method, $reference, $totalPaid, $totalAmount, $date) {
        $balance = $totalAmount - $totalPaid;
        $status = $balance <= 0 ? 'Paid in Full' : 'Partial Payment';
        
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #c00; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .receipt { background: white; border: 2px solid #c00; padding: 20px; margin: 20px 0; }
                .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                .total { font-weight: bold; font-size: 18px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Payment Receipt</h1>
                </div>
                <div class='content'>
                    <p>Dear {$name},</p>
                    <p>Thank you for your payment!</p>
                    <div class='receipt'>
                        <h3>Payment Details</h3>
                        <div class='receipt-row'>
                            <span>Course:</span>
                            <span><strong>{$courseName}</strong></span>
                        </div>
                        <div class='receipt-row'>
                            <span>Payment Amount:</span>
                            <span><strong>\${$amount}</strong></span>
                        </div>
                        <div class='receipt-row'>
                            <span>Payment Method:</span>
                            <span>{$method}</span>
                        </div>
                        <div class='receipt-row'>
                            <span>Reference:</span>
                            <span>{$reference}</span>
                        </div>
                        <div class='receipt-row'>
                            <span>Date:</span>
                            <span>{$date}</span>
                        </div>
                        <hr>
                        <div class='receipt-row total'>
                            <span>Total Paid:</span>
                            <span>\${$totalPaid}</span>
                        </div>
                        <div class='receipt-row'>
                            <span>Total Amount:</span>
                            <span>\${$totalAmount}</span>
                        </div>
                        <div class='receipt-row total'>
                            <span>Balance:</span>
                            <span>\${$balance}</span>
                        </div>
                        <div class='receipt-row'>
                            <span>Status:</span>
                            <span><strong>{$status}</strong></span>
                        </div>
                    </div>
                    <p>This is your official payment receipt. Please keep it for your records.</p>
                </div>
                <div class='footer'>
                    <p>&copy; 2026 JACOM Training Platform. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
    
    private function getAssignmentReminderTemplate($name, $title, $courseName, $dueDate) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #ffc107; color: #333; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .button { background: #c00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
                .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>⏰ Assignment Due Soon</h1>
                </div>
                <div class='content'>
                    <p>Dear {$name},</p>
                    <div class='warning'>
                        <p><strong>Reminder:</strong> You have an upcoming assignment deadline!</p>
                    </div>
                    <p><strong>Assignment Details:</strong></p>
                    <ul>
                        <li>Course: {$courseName}</li>
                        <li>Assignment: {$title}</li>
                        <li>Due Date: <strong>{$dueDate}</strong></li>
                    </ul>
                    <p>Don't forget to submit your assignment before the deadline to avoid late penalties.</p>
                    <a href='http://localhost:3000/training/dashboard' class='button'>View Assignment</a>
                </div>
                <div class='footer'>
                    <p>&copy; 2026 JACOM Training Platform. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
    
    private function getCertificateTemplate($name, $courseName, $certificateNumber, $pdfUrl) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #c00 0%, #8b0000 100%); color: white; padding: 30px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .button { background: #c00; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
                .certificate-badge { background: #ffd700; color: #333; padding: 10px 20px; border-radius: 30px; display: inline-block; font-weight: bold; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>🎓 Congratulations!</h1>
                    <p style='font-size: 18px;'>You've Completed the Course</p>
                </div>
                <div class='content'>
                    <p>Dear {$name},</p>
                    <p style='text-align: center;'>
                        <span class='certificate-badge'>🏆 COURSE COMPLETED</span>
                    </p>
                    <p>Congratulations on successfully completing <strong>{$courseName}</strong>!</p>
                    <p>Your dedication and hard work have paid off. We're proud of your achievement!</p>
                    <p><strong>Certificate Details:</strong></p>
                    <ul>
                        <li>Course: {$courseName}</li>
                        <li>Certificate Number: {$certificateNumber}</li>
                        <li>Status: Verified</li>
                    </ul>
                    <p style='text-align: center;'>
                        <a href='{$pdfUrl}' class='button'>Download Certificate</a>
                    </p>
                    <p>Share your achievement on LinkedIn and other professional networks!</p>
                    <p>We wish you continued success in your learning journey.</p>
                </div>
                <div class='footer'>
                    <p>&copy; 2026 JACOM Training Platform. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";
    }
}
