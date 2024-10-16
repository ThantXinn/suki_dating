import { clsx, type ClassValue } from "clsx";
import crypto from 'crypto';
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const algorithm = 'aes-256-cbc';
const key = Buffer.from('0123456789abcdef0123456789abcdef', 'utf-8'); // 32-byte key
const iv = Buffer.from('abcdef9876543210', 'utf-8'); // 16-byte IV

// Encryption function
export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  // Encrypting the text
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

  // Returning IV and encrypted text as a colon-separated string in hex format
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

// Decryption function
export const decrypt = (encryptedText: string): string => {
  const [ivHex, encryptedHex] = encryptedText.split(':');
  
  if (!ivHex || !encryptedHex) {
    throw new Error('Invalid encrypted text format');
  }

  const ivBuffer = Buffer.from(ivHex, 'hex');
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  
  // Decrypting the text
  const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

  return decrypted.toString('utf8');
};

export const calculateUserAge = (startDate: Date, endDate: Date): number => {
    const yearDiff = endDate.getFullYear() - startDate.getFullYear();

    // Adjust the result if the current month/day is before the specific month/day
    const isBeforeBirthday =
      endDate.getMonth() < startDate.getMonth() ||
      (endDate.getMonth() === startDate.getMonth() &&
        endDate.getDate() < startDate.getDate());

    return isBeforeBirthday ? yearDiff - 1 : yearDiff;
  };
  

