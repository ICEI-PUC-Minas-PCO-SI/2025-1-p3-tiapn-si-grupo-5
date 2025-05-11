// src/pages/Home.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Card className="p-4 w-[400px]">
        <CardHeader>
          <CardTitle>Hello World!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Teste" />
            <Button variant="default">TrackIT</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}