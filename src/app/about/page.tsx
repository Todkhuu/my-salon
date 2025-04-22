import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-black py-20 text-white md:py-32">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Barbershop interior"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Our Story
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
              Crafting confidence through exceptional grooming experiences since
              2010
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-[1400px] m-auto py-16 md:py-24">
        <div className="px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold">The StyleCut Journey</h2>
              <p className="mb-6 text-gray-600">
                Founded in 2010 by master barber James Wilson, StyleCut began as
                a small, one-chair operation with a simple mission: to provide
                exceptional grooming services in a welcoming environment where
                everyone feels valued.
              </p>
              <p className="mb-6 text-gray-600">
                Over the years, we've grown into a full-service barbershop with
                a team of skilled professionals, but our core values remain
                unchanged. We believe that a great haircut is more than just a
                service—it's an experience that boosts confidence and helps you
                put your best self forward.
              </p>
              <p className="text-gray-600">
                Today, StyleCut is proud to be a cornerstone of the community,
                serving clients of all ages and backgrounds with the same
                dedication to quality and service that has defined us from day
                one.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Barbershop history"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
            <p className="mb-12 text-gray-600">
              At StyleCut, everything we do is guided by our commitment to
              excellence and these core principles
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-black p-3 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  Quality Craftsmanship
                </h3>
                <p className="text-gray-600">
                  We take pride in our work and are committed to delivering
                  precision cuts and exceptional service every time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-black p-3 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  Inclusive Environment
                </h3>
                <p className="text-gray-600">
                  We create a welcoming space where everyone feels comfortable,
                  respected, and valued.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-black p-3 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Continuous Growth</h3>
                <p className="text-gray-600">
                  We're always learning, improving our skills, and staying
                  current with the latest trends and techniques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-[1400px] m-auto py-16 md:py-24">
        <div className="px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Meet Our Expert Team</h2>
            <p className="mb-12 text-gray-600">
              Our talented professionals bring years of experience and passion
              to every service
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="John Smith"
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-xl font-bold">John Smith</h3>
                <p className="mb-2 text-sm text-gray-500">
                  Master Barber & Founder
                </p>
                <p className="text-sm text-gray-600">
                  With over 15 years of experience, John specializes in classic
                  cuts and precision fades.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Sarah Johnson"
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-xl font-bold">Sarah Johnson</h3>
                <p className="mb-2 text-sm text-gray-500">Senior Stylist</p>
                <p className="text-sm text-gray-600">
                  Sarah brings creativity and precision to every cut,
                  specializing in modern styles and color treatments.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Mike Williams"
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-xl font-bold">Mike Williams</h3>
                <p className="mb-2 text-sm text-gray-500">Barber & Colorist</p>
                <p className="text-sm text-gray-600">
                  Mike combines traditional barbering with innovative coloring
                  techniques for unique styles.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Lisa Chen"
                  width={300}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-xl font-bold">Lisa Chen</h3>
                <p className="mb-2 text-sm text-gray-500">Nail Technician</p>
                <p className="text-sm text-gray-600">
                  Lisa's attention to detail and creativity make her a favorite
                  for nail services and art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">What Our Clients Say</h2>
            <p className="mb-12 text-gray-600">
              Don't just take our word for it—hear from our satisfied clients
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-gray-600">
                  "I've been coming to StyleCut for years and have never been
                  disappointed. John always knows exactly how I like my hair and
                  keeps up with the latest trends."
                </p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Client"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Michael R.</p>
                    <p className="text-sm text-gray-500">
                      Loyal client since 2015
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-gray-600">
                  "Sarah transformed my look completely! Her attention to detail
                  and understanding of what would suit my face shape was
                  impressive. Best color treatment I've ever had."
                </p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Client"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Jennifer T.</p>
                    <p className="text-sm text-gray-500">Regular client</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 italic text-gray-600">
                  "The online booking system is so convenient, and the service
                  is always top-notch. Lisa's nail art is incredible—I always
                  get compliments after my appointments!"
                </p>
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Client"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Amanda K.</p>
                    <p className="text-sm text-gray-500">Monthly visitor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="grid gap-8 rounded-lg bg-black p-8 text-white md:grid-cols-4">
            <div className="text-center">
              <p className="text-4xl font-bold">12+</p>
              <p className="mt-2">Years in Business</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">15k+</p>
              <p className="mt-2">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">8</p>
              <p className="mt-2">Expert Stylists</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">20+</p>
              <p className="mt-2">Service Options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Visit Us</h2>
            <p className="mb-12 text-gray-600">
              We'd love to welcome you to our modern, comfortable space
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Barbershop location"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-black" />
                  <div>
                    <h3 className="font-bold">Location</h3>
                    <p className="text-gray-600">
                      123 Main Street, Anytown, USA 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-black" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-black" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">info@stylecut.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Monday - Friday</span>
                      </div>
                      <span>9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Saturday</span>
                      </div>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                        <span>Sunday</span>
                      </div>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-xl font-bold">Follow Us</h3>
                    <div className="flex space-x-4">
                      <Link
                        href="#"
                        className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                      >
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </Link>
                      <Link
                        href="#"
                        className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                      >
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                      </Link>
                      <Link
                        href="#"
                        className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Link href="/services">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Book an Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="rounded-lg bg-gradient-to-r from-gray-900 to-black p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold">Ready for a Fresh Look?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-200">
              Experience the StyleCut difference today. Our team of
              professionals is ready to help you look and feel your best.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/services">
                <Button className="bg-white text-black hover:bg-gray-100">
                  View Our Services
                </Button>
              </Link>
              <Link href="/booking">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
