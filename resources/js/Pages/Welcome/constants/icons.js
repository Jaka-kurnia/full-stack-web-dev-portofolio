export const iconMap = {
    'html': 'devicon-html5-plain colored',
    'css': 'devicon-css3-plain colored',
    'tailwind': 'devicon-tailwindcss-original colored',
    'bootstrap': 'devicon-bootstrap-plain colored',
    'javascript': 'devicon-javascript-plain colored',
    'react': 'devicon-react-original colored',
    'php': 'devicon-php-plain colored',
    'laravel': 'devicon-laravel-original colored',
    'mysql': 'devicon-mysql-plain colored',
    'dart': 'devicon-dart-plain colored',
    'flutter': 'devicon-flutter-plain colored',
    'vs code': 'devicon-vscode-plain colored',
    'figma': 'devicon-figma-plain colored',
    'ms word': 'devicon-windows8-original colored',
    'ms excel': 'devicon-windows8-original colored',
    'github': 'devicon-github-original',
    'next.js': 'devicon-nextjs-original-wordmark',
    'nodejs': 'devicon-nodejs-plain colored',
    'sql server': 'devicon-sqlserver-plain colored',
    'canva': 'devicon-canva-original',
    'composer': 'devicon-composer-line-wordmark',
    'dotnetcore': 'devicon-dotnetcore-plain colored',
    'filamentphp': 'devicon-filamentphp-original',
    'fastapi': 'devicon-fastapi-plain colored',
    'java': 'devicon-java-plain colored',
    'jquery': 'devicon-jquery-plain colored',
    'livewire': 'devicon-livewire-plain colored',
    'npm': 'devicon-npm-original-wordmark colored',
    'postman': 'devicon-postman-plain colored',
};

export const getIconClass = (name) => {
    const key = name.toLowerCase();
    return iconMap[key] || 'devicon-devicon-plain';
};
