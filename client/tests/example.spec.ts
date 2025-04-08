import { expect, test } from "@playwright/test";

test("As a visitor, I can show the video non freemium Discover React", async ({
  page,
}) => {
  // 1. Navigate to the homepage
  await page.goto("http://localhost:3000/");
  // 2. Click on the "Courses" link
  const courseLink = page.getByRole("link", { name: "Courses" });
  await courseLink.click();
  // 3. Verify that the user is on the Courses page
  await expect(page).toHaveURL("http://localhost:3000/course");
  // 4. Click on the React category button (using data-id)
  const reactVideosLink = page.locator("button[data-id='6']");
  await reactVideosLink.click();
  // 5. Wait for the video title to appear
  const videoTitleSelector = "h1:has-text('Discover React')";
  await page.waitForSelector(videoTitleSelector);
  // 6. Verify that the video page is loaded by checking the title.
  const videoTitle = await page.locator(videoTitleSelector).textContent();
  expect(videoTitle).toBeTruthy();
});
