/**
 * Server-side proxy for LM Arena API — avoids browser CORS on Netlify.
 * Set LM_ARENA_API_KEY in Netlify: Site settings → Environment variables
 */

const LM_ARENA_URL = "https://api.lmarena.ai/v1/chat/completions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.LM_ARENA_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "LM_ARENA_API_KEY is not set in Netlify environment variables.",
      }),
    };
  }

  try {
    const upstream = await fetch(LM_ARENA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: event.body,
    });

    const text = await upstream.text();

    return {
      statusCode: upstream.status,
      headers: {
        ...corsHeaders,
        "Content-Type": upstream.headers.get("content-type") || "application/json",
      },
      body: text,
    };
  } catch (err) {
    console.error("LM Arena proxy error:", err);
    return {
      statusCode: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to reach LM Arena API." }),
    };
  }
};
