import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, Users, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every property we showcase and every service we provide.",
    },
    {
      icon: Target,
      title: "Integrity",
      description: "Transparency and honesty are at the core of our business practices.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your satisfaction and dream home are our top priorities.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We leverage the latest technology to make your property search seamless.",
    },
  ];

  const stats = [
    { number: "500+", label: "Properties Listed" },
    { number: "1000+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "98%", label: "Customer Satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About Qara Homes
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are a premier real estate platform dedicated to helping you find your perfect home. 
              With years of experience and a passion for exceptional service, we make property search 
              simple, transparent, and enjoyable.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission */}
          <div className="mb-20">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  To revolutionize the real estate experience by providing a modern, user-friendly platform 
                  that connects people with their dream homes. We believe everyone deserves a home they love, 
                  and we're here to make that journey effortless and exciting.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <value.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              Our dedicated team of real estate professionals is committed to providing you with 
              exceptional service and expert guidance throughout your property journey.
            </p>
            <div className="bg-secondary/30 rounded-2xl p-12">
              <p className="text-muted-foreground italic">
                "At Qara Homes, we don't just help you find a house – we help you find a home where 
                memories are made and dreams come true."
              </p>
              <p className="mt-4 font-semibold">- The Qara Homes Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
