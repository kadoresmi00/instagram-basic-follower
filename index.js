const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
let { accountArray } = require('./functions.js')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let followUser = "ensar.54_"
async function main(x) {
    let args = ["--disable-gpu", '--no-sandbox', "--disable-features=IsolateOrigins,site-per-process", '--blink-settings=imagesEnabled=true', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-accelerated-2d-canvas', '--no-first-run', '--no-zygote', "--no-sandbox", `--window-size=1000,1000`, "--disable-setuid-sandbox", "--disable-web-security", "--enable-features=ExperimentalJavaScript"]
    const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', headless: false, args, devtools: false }).catch(() => { return false });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1000, height: 1000 });
        await page.goto('https://www.instagram.com/login')
        await sleep(2000)
        await page.type('[name="username"]', x.email)
        await page.type('[name="password"]', x.password)
        await page.click('[type="submit"]')
        await sleep(5000)
        let login = await page.waitForSelector('[class="xh8yej3 x1iyjqo2"]', { timeout: 5000 }).catch(() => { return false });
        if (!login) {
            console.log('Login failed')
            await browser.close();
            return false;
        }
        await page.goto('https://www.instagram.com/' + followUser)
        await sleep(2000)
        await page.click('[class="_acan _acap _acas _aj1-"]').catch(() => { return false });
        await sleep(2000)
        browser.close();
        console.log('Followed ' + followUser);
    } catch (error) {
        browser.close();
    }
}


let acc = accountArray();
acc.forEach(async (x, i) => { await main(x) })