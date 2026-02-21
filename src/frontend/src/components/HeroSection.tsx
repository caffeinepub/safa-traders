export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            Trusted Scrap Trading Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Safa Traders provides reliable, sustainable, and professional scrap collection 
            and recycling services. Fair pricing, prompt service, and complete transparency 
            for dealers and companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/dealer-profile" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
            >
              Dealer Login
            </a>
            <a 
              href="/company-profile" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-semibold text-lg hover:bg-secondary/90 transition-colors border-2 border-primary/20 shadow-lg"
            >
              Company Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
