import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 100000,
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['html',{open:'always'}],['line'],["allure-playwright"]],
  use: {   
    trace: 'on',
    headless:false,
    screenshot:"on",
    video:'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chromium'] ,
      viewport: null,
      launchOptions: {
        args: ["--start-maximized"]
        } 
       }
      },
      /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] ,
      launchOptions: {
        args: ["--kiosk"]
    }},
    },

   { name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
      viewport: { width: 1280, height: 680 }
    }} */
  ],
});
