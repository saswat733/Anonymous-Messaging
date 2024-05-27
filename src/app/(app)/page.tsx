'use client'
import React,{useState,useEffect} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import messages from '../../messages.json'

import { Skeleton } from "@/components/ui/skeleton"


const Home = () => {
  const [load, setload] = useState(false)

  useEffect(() => {
  setload(true);
  })

  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 py-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the world of Anonymous conversations
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Explore Mystery Message - Where your identity remains a secret.
          </p>
        </section>

      {
        load?(
        <>
            <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        </>
      ):(
        <>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />

        </>
      )
      }
      
      </main>

       {/* Footer */}
       <footer className="text-center absolute bottom-0 w-full p-4 md:p-6 bg-gray-900 text-white">
       © 2023 True Feedback. All rights reserved.
     </footer>
    </div>
  );
};

export default Home;
