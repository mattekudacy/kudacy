import fs from 'fs';
import path from 'path';

export class ResumeKnowledgeBase {
  private resumeContent: string = '';

  constructor() {
    this.loadResume();
  }

  private loadResume() {
    try {
      const resumePath = path.join(process.cwd(), 'src', 'data', 'resume.md');
      console.log('Loading resume from:', resumePath); // Debug log
      this.resumeContent = fs.readFileSync(resumePath, 'utf-8');
      console.log('Resume loaded successfully, length:', this.resumeContent.length); // Debug log
    } catch (error) {
      console.error('Error loading resume:', error);
      this.resumeContent = 'Resume not found.';
    }
  }

  /**
   * Search for relevant information in the resume based on query
   */
  searchResume(query: string): string {
    console.log('searchResume called with query:', query); // Debug log
    
    if (!this.resumeContent) {
      console.log('No resume content available'); // Debug log
      return 'Resume content not available.';
    }

    const lowerQuery = query.toLowerCase();
    const lines = this.resumeContent.split('\n');
    const relevantSections: string[] = [];
    
    console.log('Resume has', lines.length, 'lines'); // Debug log
    
    // Find sections that contain the query terms
    let currentSection = '';
    let sectionContent: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if this is a header (starts with #)
      if (line.startsWith('#')) {
        // Save previous section if it was relevant
        if (currentSection && sectionContent.some(l => l.toLowerCase().includes(lowerQuery))) {
          relevantSections.push(currentSection + '\n' + sectionContent.join('\n'));
          console.log('Found relevant section:', currentSection); // Debug log
        }
        
        // Start new section
        currentSection = line;
        sectionContent = [];
      } else {
        sectionContent.push(line);
      }
    }
    
    // Check the last section
    if (currentSection && sectionContent.some(l => l.toLowerCase().includes(lowerQuery))) {
      relevantSections.push(currentSection + '\n' + sectionContent.join('\n'));
      console.log('Found relevant last section:', currentSection); // Debug log
    }
    
    console.log('Found', relevantSections.length, 'relevant sections'); // Debug log
    
    // If no specific sections found, return the whole resume
    if (relevantSections.length === 0) {
      // Check for general keywords that should return full resume
      const generalKeywords = ['resume', 'cv', 'background', 'experience', 'about'];
      if (generalKeywords.some(keyword => lowerQuery.includes(keyword))) {
        console.log('Returning full resume for general query'); // Debug log
        return this.resumeContent;
      }
      
      // Search for specific terms in the entire content
      const words = lowerQuery.split(' ');
      const matchingLines = lines.filter(line => 
        words.some(word => line.toLowerCase().includes(word))
      );
      
      console.log('Found', matchingLines.length, 'matching lines'); // Debug log
      
      if (matchingLines.length > 0) {
        return matchingLines.join('\n');
      }
      
      return 'No relevant information found in resume for this query.';
    }
    
    return relevantSections.join('\n\n---\n\n');
  }

  /**
   * Get the full resume content
   */
  getFullResume(): string {
    return this.resumeContent;
  }

  /**
   * Get specific sections of the resume
   */
  getSection(sectionName: string): string {
    const lines = this.resumeContent.split('\n');
    
    // Map section names to possible header variations
    const sectionMappings: { [key: string]: string[] } = {
      'experience': ['experience', 'experiences', 'work experience', 'employment'],
      'education': ['education', 'academic', 'university', 'college'],
      'skills': ['skills', 'technical skills', 'skills & interests'],
      'projects': ['projects', 'personal projects', 'portfolio'],
      'certifications': ['certifications', 'certificates', 'training'],
      'contact': ['contact', 'contact information'],
      'speaking': ['speaking', 'speaking engagements', 'talks', 'presentations']
    };
    
    const possibleHeaders = sectionMappings[sectionName.toLowerCase()] || [sectionName];
    console.log('Looking for section:', sectionName, 'with headers:', possibleHeaders); // Debug log
    
    let inSection = false;
    let sectionContent: string[] = [];
    let currentSectionLevel = 0;
    
    for (const line of lines) {
      // Check if this line is a header
      const headerMatch = line.match(/^(#+)\s*(.+)$/);
      
      if (headerMatch) {
        const headerLevel = headerMatch[1].length;
        const headerText = headerMatch[2].toLowerCase();
        
        // Check if this matches any of our target sections
        if (possibleHeaders.some(header => headerText.includes(header.toLowerCase()))) {
          inSection = true;
          currentSectionLevel = headerLevel;
          sectionContent = [line]; // Include the header
          console.log('Found matching section:', line); // Debug log
        } 
        // If we're in a section and hit a header of equal or higher level, stop
        else if (inSection && headerLevel <= currentSectionLevel) {
          break;
        }
        // If we're in a section, continue collecting
        else if (inSection) {
          sectionContent.push(line);
        }
      } else if (inSection) {
        sectionContent.push(line);
      }
    }
    
    console.log('Section content lines:', sectionContent.length); // Debug log
    return sectionContent.length > 0 ? sectionContent.join('\n') : `Section '${sectionName}' not found in resume.`;
  }
}
