import { Member, CollectionEntry, SEED_MEMBERS, DEFAULT_PASSWORD } from './types';

const MEMBERS_KEY = 'coop_members';
const COLLECTIONS_KEY = 'coop_collections';
const AUTH_KEY = 'coop_authenticated';
const PASSWORD_KEY = 'coop_password';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function write<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Auth
export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}
export function setAuthenticated(v: boolean) {
  localStorage.setItem(AUTH_KEY, v ? 'true' : 'false');
}

// Password
export function getPassword(): string {
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
}
export function setPassword(pwd: string) {
  localStorage.setItem(PASSWORD_KEY, pwd);
}

// Members
export function getMembers(): Member[] {
  const members = read<Member[]>(MEMBERS_KEY, []);
  if (members.length === 0) {
    write(MEMBERS_KEY, SEED_MEMBERS);
    return SEED_MEMBERS;
  }
  return members;
}

export function saveMembers(members: Member[]) {
  write(MEMBERS_KEY, members);
}

export function addMember(member: Omit<Member, 'id' | 'serial'>): Member {
  const members = getMembers();
  const newMember: Member = {
    ...member,
    id: Date.now().toString(),
    serial: members.length > 0 ? Math.max(...members.map(m => m.serial)) + 1 : 1,
  };
  members.push(newMember);
  saveMembers(members);
  return newMember;
}

export function updateMember(id: string, data: Partial<Member>) {
  const members = getMembers().map(m => m.id === id ? { ...m, ...data } : m);
  saveMembers(members);
}

export function deleteMember(id: string) {
  saveMembers(getMembers().filter(m => m.id !== id));
}

// Collections
export function getCollections(month: string): CollectionEntry[] {
  const all = read<CollectionEntry[]>(COLLECTIONS_KEY, []);
  return all.filter(c => c.month === month);
}

export function getAllCollections(): CollectionEntry[] {
  return read<CollectionEntry[]>(COLLECTIONS_KEY, []);
}

export function saveCollection(entry: CollectionEntry) {
  const all = read<CollectionEntry[]>(COLLECTIONS_KEY, []);
  const idx = all.findIndex(c => c.memberId === entry.memberId && c.month === entry.month);
  if (idx >= 0) all[idx] = entry;
  else all.push(entry);
  write(COLLECTIONS_KEY, all);
}

export function saveCollectionsBatch(entries: CollectionEntry[]) {
  const all = read<CollectionEntry[]>(COLLECTIONS_KEY, []);
  for (const entry of entries) {
    const idx = all.findIndex(c => c.memberId === entry.memberId && c.month === entry.month);
    if (idx >= 0) all[idx] = entry;
    else all.push(entry);
  }
  write(COLLECTIONS_KEY, all);
}
