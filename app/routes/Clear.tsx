import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Clear = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();

  const navigate = useNavigate();

  const [files, setFiles] = useState<FSItem[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir('./')) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/clear`);
    }
  }, [isLoading]);

  const handleDelete = async () => {
    setIsDeleting(true);
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });

    await kv.flush();
    loadFiles();
    setIsDeleting(false);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen w-full bg-[url("/images/bg-main.svg")] bg-cover'>
        <p className='text-gray-500 text-lg'>Loading ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen w-full bg-[url("/images/bg-main.svg")] bg-cover'>
        <p className='text-red-500 text-lg'>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full bg-[url("/images/bg-main.svg")] bg-cover bg-center'>
      <div className='max-w-2xl mx-auto p-8'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-md font-medium mb-6 transition-colors'
        >
          <img src='/icons/back.svg' alt='back' className='h-3 w-3' />
          Back to Home page
        </Link>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-1'>
            Manage Storage
          </h1>
          <p className='text-gray-500'>
            Authenticated as{' '}
            <span className='font-medium text-gray-700'>
              {auth.user?.username}
            </span>
          </p>
        </div>

        <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Existing Files
            </h2>
            <span className='text-sm text-gray-400'>
              {files.length} {files.length === 1 ? 'file' : 'files'}
            </span>
          </div>

          {files.length === 0 ? (
            <p className='text-gray-400 text-sm py-4 text-center'>
              No files found.
            </p>
          ) : (
            <div className='flex flex-col divide-y divide-gray-100'>
              {files.map((file) => (
                <div
                  key={file.id}
                  className='flex flex-row items-center gap-3 py-3'
                >
                  <span className='w-2 h-2 rounded-full bg-gray-300 shrink-0' />
                  <p className='text-gray-700 text-sm truncate'>{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting || files.length === 0}
          className='w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-4 py-3 rounded-xl cursor-pointer transition-colors'
        >
          {isDeleting ? 'Clearing...' : 'Clear All Files'}
        </button>
      </div>
    </div>
  );
};

export default Clear;
