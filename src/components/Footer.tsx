export default function Footer() {
    return (
      <footer className='border-t border-surface px-4 py-3 sm:py-5 md:py-6' role='contentinfo'>
        <div className='w-full max-w-[1024px] mx-auto flex flex-col items-center gap-3 sm:flex-row sm:justify-between'>
          <p>
            Created by{" "}
            <a
              href='https://www.ibrahimalmeyda.dev'
              target='_blank'
              rel='author'
              aria-label='Sitio web del autor Ibrahim Almeyda'
              className='text-primary font-medium'
            >
              IbrahimAlmeyda
            </a>
          </p>
          <p>All rights reserved © 2025</p>
        </div>
      </footer>
    );
}
