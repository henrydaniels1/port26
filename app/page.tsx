import { Hero, NavBar, ProjectsPreview, SkillsTree } from './components';

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero
        name="EZENWA HENRY-DANIEL"
        subtitle="FullStack Web Developer"
      />
      <SkillsTree />
      <ProjectsPreview />
    </main>
  );
}
