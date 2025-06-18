"use client";

import type React from "react";
import { useState, useCallback } from "react";

import { X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
  placeholder?: string;
  error?: string;
}

export function ImageUpload({
  onImageChange,
  accept = "image/*",
  maxSize = 10,
  className = "",
  label = "Upload Image",
  placeholder = "Click to upload or drag and drop",
  error,
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleImageChange = useCallback(
    (file: File | null) => {
      if (file) {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          alert(`File size must be less than ${maxSize}MB`);
          return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageChange(file);
      }
    },
    [maxSize, onImageChange]
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    handleImageChange(file);
  };

  const removeImage = useCallback(() => {
    setImagePreview(null);
    setSelectedFile(null);
    onImageChange(null);

    // Reset the file input
    const fileInput = document.getElementById(
      "image-upload-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }, [onImageChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageChange(files[0]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label htmlFor="image-upload-input">{label}</Label>}

      {!imagePreview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : error
              ? "border-red-300 hover:border-red-400"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("image-upload-input")?.click()}
        >
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon
              className={`w-8 h-8 ${error ? "text-red-400" : "text-gray-400"}`}
            />
            <div className="text-sm text-gray-600">
              <span className="text-blue-600 hover:text-blue-500 font-medium">
                {placeholder}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </div>
          <Input
            id="image-upload-input"
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border">
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="mt-2 text-sm text-gray-600 truncate">
            {selectedFile?.name}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
