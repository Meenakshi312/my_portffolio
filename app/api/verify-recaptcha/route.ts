import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 400 })
    }

    // Your reCAPTCHA secret key (replace with your actual secret key)
    const secretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe" // Test key - replace with your real secret key

    const verificationResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const verificationData = await verificationResponse.json()

    if (verificationData.success) {
      // reCAPTCHA v3 returns a score between 0.0 and 1.0
      // 1.0 is very likely a good interaction, 0.0 is very likely a bot
      const score = verificationData.score || 0

      return NextResponse.json({
        success: true,
        score: score,
        action: verificationData.action,
        hostname: verificationData.hostname,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "reCAPTCHA verification failed",
          errorCodes: verificationData["error-codes"],
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
