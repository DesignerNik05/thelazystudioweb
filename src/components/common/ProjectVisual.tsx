import type { ProjectVisualProps } from "@/@types";
const ProjectVisual = ({ visual, className = "" }: ProjectVisualProps) => {
  return (
    <div className={`${className} project-visual project-visual--${visual}`} aria-hidden="true">
      <span className="project-visual__glow" />
      <span className="project-visual__panel project-visual__panel--wide" />
      <span className="project-visual__panel project-visual__panel--chart" />
      <span className="project-visual__panel project-visual__panel--side" />
      <span className="project-visual__line project-visual__line--one" />
      <span className="project-visual__line project-visual__line--two" />
      <span className="project-visual__dot" />
    </div>
  );
};

export { ProjectVisual };
