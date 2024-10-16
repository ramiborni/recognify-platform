import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function PreviewLanding() {
  return (
    <div className="py-1">
      <div className="pb-6 sm:pb-16">
        <MaxWidthWrapper>
          <div className="rounded-xl md:bg-muted/30 md:ring-1 md:ring-inset md:ring-border">
            <div className="relative overflow-hidden rounded-xl border md:rounded-lg">
              <div 
                style={{
                  position: "relative",
                  paddingBottom: "56.25%", // This is the aspect ratio for 16:9
                  height: 0,
                }}
              >
                <iframe 
                  id="demo" 
                  src="https://www.loom.com/embed/97dd9fd0f57f4bc3b89fbe8741136c31?sid=1c3d4975-e6c6-45bc-bc9c-03969fad5295"
                  frameBorder={0}
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}