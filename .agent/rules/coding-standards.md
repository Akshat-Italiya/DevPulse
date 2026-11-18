# DevPulse Agent Coding Standards

- **TypeScript**: Strict mode enabled. No `any` types; prefer explicit interfaces or type aliases.
- **Components**: Functional components with TypeScript props interface. Colocate component-specific styles and types.
- **Styling**: Tailwind CSS utility classes. Use `clsx` or `twMerge` when combining conditional classes.
- **State**: Keep state minimal and lifted to the closest shared ancestor or custom hook.
- **Icons**: Use `lucide-react`.
