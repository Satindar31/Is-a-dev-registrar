import Script from "next/script"

export default function Analytics() {
    return (
        <>
            <Script
                src={process.env.UMAMI_URL!}
                data-website-id={process.env.UMAMI_ID!}
                strategy="afterInteractive"
            />
        </>
    )
}