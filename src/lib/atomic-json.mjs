import { mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export async function writeJsonAtomic(filepath, value) {
  const directory = path.dirname(filepath);
  const temporary = path.join(directory, `.${path.basename(filepath)}.${randomUUID()}.tmp`);
  await mkdir(directory, { recursive: true });

  try {
    await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { encoding: 'utf8', flag: 'wx' });
    await rename(temporary, filepath);
  } catch (error) {
    await unlink(temporary).catch(() => {});
    throw error;
  }
}
