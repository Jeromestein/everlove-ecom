'use client'

type Project = {
  title: string
  description: string
  image: string
}

type Props = {
  projects: Project[]
}

export function ProjectsSection({ projects }: Props) {
  return (
    <section className="bg-[#fdf2f8] py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#eb3f69] shadow-sm">
            Our Projects
          </span>
          <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">Making a difference, one child at a time</h3>
          <p className="mt-3 text-lg text-slate-600">
            Explore our current initiatives bringing education to children in need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-rose-50 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  src={project.image}
                />
              </div>
              <div className="space-y-3 p-6">
                <h4 className="text-xl font-bold text-slate-900">{project.title}</h4>
                <p className="text-slate-600">{project.description}</p>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#eb3f69] hover:underline" type="button">
                  Learn more
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
