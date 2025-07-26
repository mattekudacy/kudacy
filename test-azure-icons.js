// Test script to check available Azure icons
try {
  const si = require('react-icons/si');
  
  const azureIcons = [
    'SiMicrosoftazure',
    'SiAzuredevops', 
    'SiAzurefunctions',
    'SiMicrosoft',
    'SiAzure'
  ];
  
  console.log('Available Azure/Microsoft icons:');
  azureIcons.forEach(iconName => {
    if (si[iconName]) {
      console.log(`✅ ${iconName} - Available`);
    } else {
      console.log(`❌ ${iconName} - Not found`);
    }
  });
  
} catch (error) {
  console.error('Error:', error.message);
}
