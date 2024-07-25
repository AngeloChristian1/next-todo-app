'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export default function GitHubButton() {
  return <Button onClick={() => signIn('github')}>Continue with GitHub</Button>;
}
