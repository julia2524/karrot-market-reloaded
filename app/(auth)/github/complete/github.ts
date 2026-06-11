export async function getAccessToken(code: string) {
  const baseURL = "https://github.com/login/oauth/access_token";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_SECRETS!,
    code,
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;

  const response = await fetch(finalURL, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  console.log("토큰함수실행!");
  if (!response.ok) {
    return null;
  }
  const { error, access_token } = await response.json();
  if (error) {
    return null;
  }
  return access_token;
}

export async function getGithubProfile(token: string) {
  const userResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-cache",
  });
  if (!userResponse.ok) {
    return null;
  }
  return userResponse.json();
}

interface EmailProps {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}
export async function getGithubEmail(token: string) {
  const emailResponse = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-cache",
  });
  if (!emailResponse.ok) {
    return null;
  }
  const emailData = await emailResponse.json();
  const primaryEmail = emailData.find(
    (data: EmailProps) => data.primary && data.verified
  );
  const email = primaryEmail?.email ?? null;
  return email;
}
