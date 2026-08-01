import pickle
import threading
from datetime import datetime, timedelta
from pathlib import Path
import cloudscraper

class CloudflareManager:
    def __init__(self, cookie_file='cf_cookies.pkl'):
        self.cookie_file = Path(cookie_file)
        self.cookies = self.load_cookies()
        self.scraper = None
        self._lock = threading.Lock()
        
    def load_cookies(self):
        try:
            if self.cookie_file.exists():
                with open(self.cookie_file, 'rb') as f:
                    data = pickle.load(f)
                    if data['expires'] > datetime.now():
                        return data['cookies']
        except Exception:
            pass
        return None
    
    def save_cookies(self, cookies, ttl_minutes=30):
        data = {
            'cookies': cookies,
            'expires': datetime.now() + timedelta(minutes=ttl_minutes)
        }
        with open(self.cookie_file, 'wb') as f:
            pickle.dump(data, f)
        self.cookies = cookies
    
    def get_scraper(self):
        if self.scraper is None:
            self.scraper = cloudscraper.create_scraper(
                browser={
                    'browser': 'chrome',
                    'platform': 'windows',
                    'desktop': True
                }
            )
        return self.scraper
    
    def make_request(self, url, max_retries=3):
        with self._lock:
            scraper = self.get_scraper()

            for attempt in range(max_retries):
                try:
                    if self.cookies:
                        response = scraper.get(
                            url,
                            cookies=self.cookies,
                            timeout=30
                        )
                    else:
                        response = scraper.get(url, timeout=30)

                    if response.status_code == 403 or 'cf-browser-verification' in response.text:
                        self.cookies = None
                        self.scraper = None

                        if attempt < max_retries - 1:
                            continue
                        else:
                            response = self.get_scraper().get(url, timeout=30)

                    if response.cookies:
                        cookies_dict = {}
                        for key, value in response.cookies.items():
                            cookies_dict[key] = value
                        if cookies_dict:
                            self.save_cookies(cookies_dict)

                    return response

                except Exception:
                    if attempt == max_retries - 1:
                        raise
                    continue

            return None

    def get_cf_clearance_only(self, url):
        response = self.make_request(url)
        if response and response.cookies:
            cf_clearance = response.cookies.get('cf_clearance')
            if cf_clearance:
                return cf_clearance
        return None

    def clear_cookies(self):
        if self.cookie_file.exists():
            self.cookie_file.unlink()
        self.cookies = None
        self.scraper = None