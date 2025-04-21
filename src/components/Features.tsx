import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Features = () => {
  return (
    <section
      id="choose"
      className="bg-background dark:bg-background flex h-screen flex-col items-center justify-center px-6 py-12"
    >
      <h2 className="text-foreground dark:text-foreground mb-10 text-center text-4xl font-bold">
        Why Choose Us?
      </h2>
      <div className="mt-7 grid gap-6 md:grid-cols-3">
        <Card className="rounded-lg text-center shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Fast Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground dark:text-muted-foreground">
              Optimized for speed and efficiency
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-lg text-center shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Secure & Reliable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground dark:text-muted-foreground">
              We prioritize your security
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-lg text-center shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Easy to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground dark:text-muted-foreground">
              Simple, user-friendly design.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Features;
