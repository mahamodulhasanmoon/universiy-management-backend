
import * as fs from 'fs';
import * as path from 'path';

function generateSemisterModule(moduleName: string) {
    const modulePath = path.join('src', 'modules', moduleName);
    const modelFilePath = path.join(modulePath, `${moduleName}.model.ts`);
    const controllerFilePath = path.join(modulePath, `${moduleName}.controller.ts`);

    // Create module directory
    fs.mkdirSync(modulePath, { recursive: true });

    // Generate model file
    fs.writeFileSync(modelFilePath, '');

    // Generate controller file
    fs.writeFileSync(controllerFilePath, '');

    console.log(`Semister module "${moduleName}" created successfully in "${modulePath}"`);
}

// Usage example
const moduleName = process.argv[2];
if (moduleName) {
    generateSemisterModule(moduleName);
} else {
    console.error('Please provide a module name.');
}

export default generateSemisterModule