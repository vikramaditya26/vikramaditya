import http.server
import socketserver
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))
port = int(os.environ.get("PORT", 8080))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

with socketserver.TCPServer(("", port), NoCacheHandler) as httpd:
    httpd.serve_forever()
