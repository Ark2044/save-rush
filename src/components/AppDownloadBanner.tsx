"use client";
import Image from "next/image";
import Link from "next/link";

export default function AppDownloadBanner() {
  return (
    <section className="py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="p-6 md:p-10 flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                Download the SaveRush App
              </h2>
              <p className="text-gray-600 mb-6 max-w-lg">
                Get groceries delivered in minutes! Enjoy exclusive app-only
                deals, faster checkout, and real-time order tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-2">Get it on</span>
                  <Link
                    href="#"
                    className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.9 5c-.7 0-1.7.4-2.8 1-.5.3-1 .6-1.4 1-1-.7-1.9-1-2.7-1-1.3 0-2.2.4-2.7.9C7.4 7.6 7 8.7 7 10.2v.5c0 .7.3 1.4.5 1.8v.1c.5 1.1 1.4 2.3 2.4 3.5.6.7 1.2 1.3 1.9 1.9.2.4.5.8.8 1.2l.1.1.4.4c.2.2.5.2.7 0l.4-.4.1-.1c.3-.4.6-.8.8-1.2.7-.6 1.3-1.2 1.9-1.9 1-1.2 1.9-2.4 2.4-3.5v-.1c.3-.5.5-1.1.5-1.8v-.5c0-1.4-.4-2.5-1.2-3.2-.5-.5-1.4-.9-2.7-.9zm0 1.6c.6 0 1 .1 1.2.3.3.3.5.9.5 1.9v.5c0 .3-.1.6-.2 1-.4.9-1.2 2-2.1 3.1-.6.7-1.2 1.3-1.8 1.9-.2.2-.3.3-.4.5-.1-.1-.2-.3-.4-.5-.6-.5-1.2-1.2-1.8-1.9-.9-1.1-1.7-2.2-2.1-3.1-.1-.4-.2-.7-.2-1v-.5c0-1 .2-1.6.5-1.9.2-.2.6-.3 1.2-.3.5 0 1.1.3 1.8.7l.5.3c.3.2.6.2.9 0l.5-.3c.8-.4 1.3-.7 1.8-.7zM17.2 7c-.2 0-.4.2-.3.4.4 1.2.3 2.1-.3 2.7-.2.2-.2.5 0 .7.1.1.2.1.3.1.1 0 .3 0 .4-.1 1-.9 1.1-2.3.5-3.8-.1-.2-.3-.2-.5-.1l-.1.1z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">GET IT ON</span>
                      <span className="text-xl font-medium leading-tight">
                        Google Play
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 mb-2">
                    Download on the
                  </span>
                  <Link
                    href="#"
                    className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.2 12c0-1.7.9-3.3 2.3-4.2-.8-1.2-2-2-3.4-2.3-1.4-.3-2.9.1-4.1.7-1.2.6-1.7.6-2.8 0C7.9 5.5 6.4 5.2 5 5.5c-1.4.3-2.6 1.1-3.4 2.3C0 9.5-.3 11.6.3 13.4c.6 1.9 1.7 3.5 3 4.9 1.3 1.4 1.8 1.6 3.1 1.6 1.3 0 1.7-.2 3.1-1.6 1.3-1.4 1.8-1.6 3.1-1.6 1.3 0 1.7.2 3.1 1.6 1.3 1.4 2.4 3 3 4.9.3.7.5 1.4.6 2.1h-4.1v-1.5h-2v-10h4.3c.1-.5-.1-1-.3-1.5-.4-.5-.9-.9-1.4-1.1-.6-.2-1.2-.3-1.8-.2-.6 0-1.2.3-1.7.6-.7.4-1.2 1-1.6 1.7-.3.7-.5 1.5-.5 2.3 0 .8.2 1.6.5 2.3.4.7.9 1.3 1.6 1.7.5.3 1.1.6 1.7.6.6.1 1.2 0 1.8-.2.5-.2 1-.6 1.4-1.1.3-.5.5-1 .3-1.5h-4.3v-2h6.3zm-3.9-7.5c.7-.1 1.5.1 2.2.5.7.4 1.2 1 1.5 1.8-1.2.6-2 1.8-2.2 3.2h-2.3c-.1-1.3-.5-2.5-1.2-3.5.5-.8 1.2-1.6 2-2z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs">DOWNLOAD ON THE</span>
                      <span className="text-xl font-medium leading-tight">
                        App Store
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side image */}
            <div className="hidden md:block md:w-1/3 self-end">
              <div className="relative h-72 w-full">
                <Image
                  src="/images/download-app.png"
                  alt="SaveRush Mobile App"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/assets/images/login_screen/login.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
