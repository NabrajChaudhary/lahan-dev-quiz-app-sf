import BlogSection from "@/modules/core/components/BlogsSection";
import Features from "@/modules/core/components/Features";
import NewsLetter from "@/modules/core/components/NewsLetter";
import QuizSteps from "@/modules/core/components/Steps";
import SubjectCoverage from "@/modules/core/components/SubjectCoverage";
import TwoColumnBlock from "@/modules/core/components/TwoColumnBlock";

export default function Home() {
  return (
    <>
      <TwoColumnBlock />
      <Features />
      <SubjectCoverage />
      <QuizSteps />
      <BlogSection />
      <NewsLetter />
    </>
  );
}
