const fs = require('fs');
const files = [
  'src/app/app/finance/expenses/page.tsx',
  'src/app/app/finance/tax/page.tsx',
  'src/app/app/finance/cash-flow/page.tsx',
  'src/app/app/hrd/termination/page.tsx',
  'src/app/app/hrd/recruitment/page.tsx',
  'src/app/app/hrd/payroll/page.tsx',
  'src/app/app/hrd/employees/page.tsx',
  'src/app/app/hrd/attendance/page.tsx'
];
for(let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if(!content.includes('<div className="overflow-x-auto">')) {
    content = content.replace('<table className="w-full text-left text-sm text-slate-600">', '<div className="overflow-x-auto">\n              <table className="w-full min-w-[800px] text-left text-sm text-slate-600">');
    content = content.replace('</table>', '</table>\n            </div>');
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
}
