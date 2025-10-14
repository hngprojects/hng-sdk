import { Button } from "@hng-sdk/ui";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="container max-w-4xl px-4 py-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              HNG SDK Documentation
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of packages and UI components for building modern web applications.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Button Sizes</h2>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Packages</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <code className="text-primary">@hng-sdk/ui</code> - UI component library
                </li>
                <li>
                  <code className="text-primary">@hng-sdk/email</code> - Email templates
                </li>
                <li>
                  <code className="text-primary">hng-sdk</code> - All packages combined
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
