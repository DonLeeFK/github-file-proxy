import { parse } from "https://deno.land/std@0.131.0/flags/mod.ts";

const githubToken = Deno.env.get('GITHUB_TOKEN');
const password = Deno.env.get('PASSWORD');

async function handleRequest(request: Request) {
    const { pathname } = new URL(request.url);
    
    if (pathname === '/') {
        return new Response(`
            <html>
                <head>
                    <title>GitHub File Proxy</title>
                </head>
                <body>
                    <h1>GitHub File Proxy</h1>
                    <p>Usage：/path_to_file?password=your_password</p>
                </body>
            </html>
        `, {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    }

    if (password && !request.url.includes(`password=${password}`)) {
        return new Response('Access Denied', {
            status: 401,
        });
    }

    const path = pathname.replace(/^\//, '');
    const githubUrl = `https://raw.githubusercontent.com/${path}`;

    try {
        const response = await fetch(githubUrl, {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
            },
        });

        if (!response.ok) {
            return new Response(`Error fetching file: ${response.status}`, {
                status: response.status,
            });
        }

        return new Response(response.body, {
            headers: {
                'Content-Type': response.headers.get('Content-Type'),
            },
        });
    } catch (error:any) {
        return new Response(`Error fetching file: ${error.message}`, {
            status: 500,
        });
    }
}

const flags = parse(Deno.args);
const port = flags.port || 8000;

Deno.serve({ port, handler: handleRequest });