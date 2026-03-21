<?php
require_once __DIR__ . '/../config/database.php';

class CertificateService {
    private $db;
    private $conn;
    
    public function __construct() {
        $this->db = Database::getInstance();
        $this->conn = $this->db->getConnection();
    }
    
    /**
     * Generate certificate for completed course
     */
    public function generateCertificate($userId, $courseId) {
        try {
            // Verify 100% completion
            $stmt = $this->conn->prepare("
                SELECT 
                    e.id as enrollmentId,
                    c.name as courseName,
                    c.duration,
                    u.name as studentName,
                    COUNT(DISTINCT cm.id) as totalLessons,
                    COUNT(DISTINCT CASE WHEN sp.status = 'completed' THEN sp.id END) as completedLessons
                FROM enrollments e
                JOIN courses c ON e.courseId = c.id
                JOIN user u ON e.userId = u.id
                LEFT JOIN course_materials cm ON c.id = cm.courseId AND cm.isPublished = 1 AND cm.type = 'video'
                LEFT JOIN student_progress sp ON e.id = sp.enrollmentId AND cm.id = sp.materialId
                WHERE e.userId = ? AND e.courseId = ? AND e.status = 'approved'
                GROUP BY e.id, c.name, c.duration, u.name
            ");
            $stmt->execute([$userId, $courseId]);
            $data = $stmt->fetch();
            
            if (!$data) {
                throw new Exception('Enrollment not found or not approved');
            }
            
            // Check if 100% complete
            if ($data['totalLessons'] == 0 || $data['completedLessons'] < $data['totalLessons']) {
                throw new Exception('Course not completed. Progress: ' . $data['completedLessons'] . '/' . $data['totalLessons']);
            }
            
            // Check if certificate already exists
            $stmt = $this->conn->prepare("
                SELECT id, certificateNumber, pdfUrl FROM certificates 
                WHERE userId = ? AND courseId = ?
            ");
            $stmt->execute([$userId, $courseId]);
            $existing = $stmt->fetch();
            
            if ($existing) {
                return [
                    'success' => true,
                    'message' => 'Certificate already exists',
                    'certificate' => $existing
                ];
            }
            
            // Generate certificate
            $certificateId = 'cert_' . bin2hex(random_bytes(8));
            $certificateNumber = 'JACOM-' . strtoupper(bin2hex(random_bytes(4))) . '-' . date('Y');
            $issueDate = date('Y-m-d');
            
            // Generate PDF
            $pdfUrl = $this->generatePDF($data['studentName'], $data['courseName'], $certificateNumber, $issueDate, $data['duration']);
            
            // Save certificate record
            $stmt = $this->conn->prepare("
                INSERT INTO certificates (id, userId, courseId, certificateNumber, issueDate, pdfUrl, createdAt)
                VALUES (?, ?, ?, ?, ?, ?, NOW())
            ");
            $stmt->execute([$certificateId, $userId, $courseId, $certificateNumber, $issueDate, $pdfUrl]);
            
            // Send certificate email
            require_once __DIR__ . '/EmailService.php';
            $emailService = new EmailService();
            $emailService->sendCertificateEmail($certificateId);
            
            return [
                'success' => true,
                'message' => 'Certificate generated successfully',
                'certificate' => [
                    'id' => $certificateId,
                    'certificateNumber' => $certificateNumber,
                    'pdfUrl' => $pdfUrl,
                    'issueDate' => $issueDate
                ]
            ];
            
        } catch (Exception $e) {
            throw new Exception('Failed to generate certificate: ' . $e->getMessage());
        }
    }
    
    /**
     * Generate PDF certificate using TCPDF or HTML template
     */
    private function generatePDF($studentName, $courseName, $certificateNumber, $issueDate, $duration) {
        // For now, generate HTML-based certificate
        // In production, use TCPDF library for proper PDF generation
        
        $uploadDir = __DIR__ . '/../../uploads/certificates/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $filename = 'certificate_' . $certificateNumber . '.html';
        $filepath = $uploadDir . $filename;
        
        $html = $this->getCertificateHTML($studentName, $courseName, $certificateNumber, $issueDate, $duration);
        
        file_put_contents($filepath, $html);
        
        // Return relative URL
        return '/uploads/certificates/' . $filename;
    }
    
    /**
     * Certificate HTML template
     */
    private function getCertificateHTML($studentName, $courseName, $certificateNumber, $issueDate, $duration) {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Certificate of Completion</title>
            <style>
                @page { size: A4 landscape; margin: 0; }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Georgia', serif;
                    background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
                }
                .certificate {
                    width: 297mm;
                    height: 210mm;
                    padding: 40mm;
                    box-sizing: border-box;
                    border: 15px solid #c00;
                    position: relative;
                    background: white;
                }
                .certificate::before {
                    content: '';
                    position: absolute;
                    top: 20mm;
                    left: 20mm;
                    right: 20mm;
                    bottom: 20mm;
                    border: 2px solid #c00;
                    pointer-events: none;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .logo {
                    font-size: 36px;
                    font-weight: bold;
                    color: #c00;
                    margin-bottom: 10px;
                }
                .title {
                    font-size: 48px;
                    font-weight: bold;
                    color: #333;
                    margin: 20px 0;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }
                .subtitle {
                    font-size: 24px;
                    color: #666;
                    margin-bottom: 40px;
                }
                .content {
                    text-align: center;
                    margin: 40px 0;
                }
                .awarded-to {
                    font-size: 20px;
                    color: #666;
                    margin-bottom: 15px;
                }
                .student-name {
                    font-size: 42px;
                    font-weight: bold;
                    color: #c00;
                    margin: 20px 0;
                    border-bottom: 3px solid #c00;
                    display: inline-block;
                    padding: 10px 40px;
                }
                .completion-text {
                    font-size: 18px;
                    color: #333;
                    margin: 30px 0;
                    line-height: 1.8;
                }
                .course-name {
                    font-size: 28px;
                    font-weight: bold;
                    color: #c00;
                    margin: 20px 0;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 60px;
                    padding: 0 60px;
                }
                .signature {
                    text-align: center;
                }
                .signature-line {
                    border-top: 2px solid #333;
                    width: 200px;
                    margin: 40px auto 10px;
                }
                .signature-label {
                    font-size: 14px;
                    color: #666;
                }
                .certificate-number {
                    text-align: center;
                    margin-top: 40px;
                    font-size: 12px;
                    color: #999;
                }
                .seal {
                    position: absolute;
                    bottom: 40mm;
                    right: 40mm;
                    width: 80px;
                    height: 80px;
                    border: 3px solid #c00;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                    color: #c00;
                    text-align: center;
                    background: white;
                }
            </style>
        </head>
        <body>
            <div class='certificate'>
                <div class='header'>
                    <div class='logo'>JACOM PLATFORM</div>
                    <div class='title'>Certificate of Completion</div>
                    <div class='subtitle'>This is to certify that</div>
                </div>
                
                <div class='content'>
                    <div class='student-name'>{$studentName}</div>
                    
                    <div class='completion-text'>
                        has successfully completed the course
                    </div>
                    
                    <div class='course-name'>{$courseName}</div>
                    
                    <div class='completion-text'>
                        Duration: {$duration}<br>
                        Issued on: " . date('F d, Y', strtotime($issueDate)) . "
                    </div>
                </div>
                
                <div class='footer'>
                    <div class='signature'>
                        <div class='signature-line'></div>
                        <div class='signature-label'>Instructor Signature</div>
                    </div>
                    <div class='signature'>
                        <div class='signature-line'></div>
                        <div class='signature-label'>Director Signature</div>
                    </div>
                </div>
                
                <div class='certificate-number'>
                    Certificate Number: {$certificateNumber}
                </div>
                
                <div class='seal'>
                    VERIFIED<br>JACOM
                </div>
            </div>
        </body>
        </html>
        ";
    }
}
