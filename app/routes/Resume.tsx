import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import ATS from '~/components/Ats';

import Details from '~/components/Details';
import Summary from '~/components/Summary';

import { usePuterStore } from '~/lib/puter';

export const meta = () => [
  { title: 'Resumind | Review' },
  { name: 'description', content: 'Detailed review of your resume' },
];

const Resume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { kv, isLoading, fs, auth } = usePuterStore();

  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resume = await kv.get(`resume:${id}`);
        if (!resume) {
          console.error('Resume not found');
          return;
        }

        const data = JSON.parse(resume);

        const resumeBlob = await fs.read(data.resumePath);
        if (!resumeBlob) {
          console.error('Failed to fetch resume file');
          return;
        }

        const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);

        const imageBlob = await fs.read(data.imagePath);
        if (!imageBlob) {
          console.error('Failed to fetch image file');
          return;
        }
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);

        setFeedback(data.feedback);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, [id]);

  return (
    <main className='!pt-0'>
      <nav className='resume-nav'>
        <Link to='/' className='back-button'>
          <img src='/icons/back.svg' alt='Back' className='h-2.5 w-2.5' />
          <span className='text-gray-800 text-sm font-semibold '>
            Back to Home page
          </span>
        </Link>
      </nav>
      <div className='flex flex-row w-full max-lg:flex-col-reverse '>
        <section className='feedback-section bg-[url(`/images/bg-small.svg`)] bg-cover h-[100vh] sticky top-0 items-center justify-center'>
          {imageUrl && resumeUrl && (
            <div className='animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit'>
              <a href={resumeUrl} target='_blank' rel='noopener noreferrer'>
                <img
                  src={imageUrl}
                  title='resume'
                  className='w-full h-full object-contain rounded-2xl'
                />
              </a>
            </div>
          )}
        </section>
        <section className='feedback-section'>
          <h2 className='text-4xl !text-black font-bold'>Resume Review</h2>
          {feedback ? (
            <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src='/images/resume-scan-2.gif' className='w-full' />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
