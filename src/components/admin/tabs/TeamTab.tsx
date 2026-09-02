import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Mail,
  Award
} from 'lucide-react';
import { useAdminData, type TeamMember } from '../../../context/AdminDataContext';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
];

const DEPARTMENTS: TeamMember['department'][] = [
  'Leadership & Founders',
  'Engineering & AI',
  'Placements & Corporate Relations',
  'Academic Curriculum',
];

export function TeamTab() {
  const {
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    toggleTeamMemberActive,
  } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState<TeamMember['department']>('Leadership & Founders');
  const [badge, setBadge] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(true);

  const sortedMembers = [...teamMembers].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleOpenAdd = () => {
    setEditingMember(null);
    setName('');
    setRole('');
    setDepartment('Leadership & Founders');
    setBadge('');
    setBio('');
    setPhoto('');
    setLinkedinUrl('');
    setEmail('');
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setDepartment(member.department);
    setBadge(member.badge || '');
    setBio(member.bio);
    setPhoto(member.photo);
    setLinkedinUrl(member.linkedinUrl || '');
    setEmail(member.email || '');
    setActive(member.active);
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setPhoto(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    if (editingMember) {
      updateTeamMember(editingMember.id, {
        name: name.trim(),
        role: role.trim(),
        department,
        badge: badge.trim(),
        bio: bio.trim(),
        photo: photo.trim() || PRESET_AVATARS[0],
        linkedinUrl: linkedinUrl.trim(),
        email: email.trim(),
        active,
      });
    } else {
      addTeamMember({
        name: name.trim(),
        role: role.trim(),
        department,
        badge: badge.trim(),
        bio: bio.trim(),
        photo: photo.trim() || PRESET_AVATARS[0],
        linkedinUrl: linkedinUrl.trim(),
        email: email.trim(),
        active,
        order: teamMembers.length + 1,
      });
    }

    setIsModalOpen(false);
    setEditingMember(null);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedMembers.length) return;

    const currentMember = sortedMembers[index];
    const targetMember = sortedMembers[targetIndex];

    updateTeamMember(currentMember.id, { order: targetMember.order || targetIndex + 1 });
    updateTeamMember(targetMember.id, { order: currentMember.order || index + 1 });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-black/8 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-mono font-bold mb-2">
            <Users size={12} />
            <span>ORGANIZATION &amp; LEADERSHIP</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] tracking-tight">
            Team &amp; Leadership Manager
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage founders, leadership directors, engineering heads, and placement strategists shown on the Team page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-pill-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer self-start sm:self-center shadow-xs"
        >
          <Plus size={14} />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* ── Team Grid ── */}
      <div className="bg-white rounded-3xl border border-black/8 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)]">
            Active Team Members ({teamMembers.length})
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {teamMembers.filter((m) => m.active).length} Visible on Website
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedMembers.map((member, index) => (
            <div
              key={member.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                member.active
                  ? 'bg-white border-black/8 hover:border-blue-200 shadow-2xs'
                  : 'bg-slate-50 border-dashed border-slate-300 opacity-60'
              }`}
            >
              <div className="space-y-3">
                {/* Photo & Badge */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-black/10 shrink-0 shadow-2xs"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                      {member.department}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 font-[family-name:var(--font-display)] truncate mt-1">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-600 font-semibold truncate">
                      {member.role}
                    </p>
                  </div>
                </div>

                {member.badge && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 text-xs font-semibold">
                    <Award size={12} className="shrink-0" />
                    <span>{member.badge}</span>
                  </div>
                )}

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  {member.linkedinUrl && (
                    <span className="inline-flex items-center gap-1 text-[#0A66C2]">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66Z" />
                      </svg>
                      <span>LinkedIn</span>
                    </span>
                  )}
                  {member.email && (
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <Mail size={13} />
                      <span className="truncate max-w-[120px]">{member.email}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveOrder(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => moveOrder(index, 'down')}
                    disabled={index === sortedMembers.length - 1}
                    className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleTeamMemberActive(member.id)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                      member.active
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-slate-100 text-slate-500'
                    }`}
                    title={member.active ? 'Hide from Team page' : 'Show on Team page'}
                  >
                    {member.active ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(member)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    title="Edit Member"
                  >
                    <Edit2 size={12} />
                  </button>

                  <button
                    onClick={() => deleteTeamMember(member.id)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No team members added yet. Click <strong>+ Add Team Member</strong> above.
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-black/10 p-6 sm:p-8 z-10 my-8 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-black/6 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 font-[family-name:var(--font-display)]">
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSave} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} className="space-y-4">
                {/* Photo Upload & Preview */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Profile Photo *
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={photo || PRESET_AVATARS[0]}
                      alt="Preview"
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-300 shadow-2xs shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Upload size={13} />
                          <span>Upload Image</span>
                        </button>
                        <span className="text-[11px] text-slate-400">or pick preset below</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {PRESET_AVATARS.map((p, i) => (
                          <img
                            key={i}
                            src={p}
                            alt=""
                            onClick={() => setPhoto(p)}
                            className={`w-7 h-7 rounded-lg object-cover cursor-pointer border-2 transition-all ${
                              photo === p ? 'border-blue-600 scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Designation / Role *
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="Enter designation / role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Department Track *
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden bg-white font-medium"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Background Badge (Optional)
                    </label>
                    <input
                      type="text"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder=""
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bio &amp; Profile Summary *
                  </label>
                  <textarea
                    rows={3}
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder="Enter bio / profile summary..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      LinkedIn URL (Optional)
                    </label>
                    <input
                      type="text"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="https://linkedin.com/in/..."
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Email (Optional)
                    </label>
                    <input
                      type="email"
                      autoComplete="new-password"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-black/10 text-xs focus:border-[#2563EB] focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="teamActiveToggle"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <label htmlFor="teamActiveToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Visible on website Team page
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-black/6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-black/10 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    {editingMember ? 'Save Changes' : 'Add Team Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
