import { Page, Response } from '@playwright/test';

export async function waitForResponse(
  page: Page,
  url: string,
  method?: string,
  status?: number,
): Promise<Response> {
  return page.waitForResponse((response) => {
    return (
      response.url().includes(url) &&
      (!method || response.request().method() == method) &&
      (!status || response.status() == status)
    );
  });
}
