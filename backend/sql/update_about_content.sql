-- Update About page content with JACOM information

UPDATE content_blocks 
SET content = 'Creating a convenient society by designing an environment using smart technology.'
WHERE `key` = 'about_main_title' AND page = 'about';

UPDATE content_blocks 
SET content = 'We are a social innovation and economic development consultancy committed to improving lives, communities and economies across Asia and Africa. For over 3 years we have delivered research, consultancy and development support to strengthen and improve the public sector, communities and businesses. We provide IoT platform solutions, system integration services, and comprehensive consulting that turns all devices into social infrastructure through industrial standardization.'
WHERE `key` = 'about_paragraph_1' AND page = 'about';

UPDATE content_blocks 
SET content = 'Our expertise includes IoT and embedded systems, digital transformation, smart factory automation, renewable energy systems, recruitment services connecting Nepal and Japan, and specialized training programs. JACOM stands for Judicious decision making, Attested achievement with integrity, Care and mutual benefit for all, Objective opportunity creation, Motivate and inspire for sustainable growth, and Excellence at its best. Since our founding in 2019, we have measured our success by the success of our clients.'
WHERE `key` = 'about_paragraph_2' AND page = 'about';
