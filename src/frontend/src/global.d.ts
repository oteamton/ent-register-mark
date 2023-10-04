interface Window {
    grecaptcha: {
      ready(callback: () => void): void;
      execute(siteKey?: string, details?: {action: string}): Promise<string>;
      // any other methods you plan to use from grecaptcha
    };
  }
  