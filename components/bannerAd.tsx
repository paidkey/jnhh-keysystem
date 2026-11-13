"use client";

export default function BannerAd({
  adKey,
  width,
  height,
}: {
  adKey: string;
  width: number;
  height: number;
}) {
  const srcDoc = `<!doctype html><html><body style="margin:0;overflow:hidden;background:transparent"><script>atOptions={'key':'${adKey}','format':'iframe','height':${height},'width':${width},'params':{}};<\/script><script src="https://bauval.org/22/${adKey}"><\/script></body></html>`;

  return (
    <iframe
      title="Advertisement"
      srcDoc={srcDoc}
      width={width}
      height={height}
      scrolling="no"
      style={{ border: 0, maxWidth: "100%" }}
      className="mx-auto block"
    />
  );
}
