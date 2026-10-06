import React, { useState } from 'react';
import { 
  AdminMember, 
  LeadTrial, 
  InBodyScanRecord, 
  ScheduleClass 
} from '../types';
import { 
  INITIAL_ADMIN_MEMBERS, 
  INITIAL_LEADS, 
  INITIAL_INBODY_SCANS, 
  SCHEDULE_CLASSES 
} from '../data/gymData';
import { 
  Users, 
  UserCheck, 
  IndianRupee, 
  Calendar, 
  Activity, 
  Plus, 
  Search, 
  Check, 
  X, 
  MessageSquare, 
  Phone, 
  Mail, 
  Dumbbell, 
  Flame, 
  Droplets, 
  Download, 
  ArrowLeft,
  ChevronDown,
  Filter,
  Shield,
  RefreshCw,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../components/Toast';

interface AdminViewProps {
  onBackToWebsite: () => void;
}

type AdminTab = 'dashboard' | 'members' | 'leads' | 'schedule' | 'inbody' | 'revenue';

export const AdminView: React.FC<AdminViewProps> = ({ onBackToWebsite }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // State for data management
  const [members, setMembers] = useState<AdminMember[]>(INITIAL_ADMIN_MEMBERS);
  const [leads, setLeads] = useState<LeadTrial[]>(INITIAL_LEADS);
  const [scans, setScans] = useState<InBodyScanRecord[]>(INITIAL_INBODY_SCANS);
  const [classes, setClasses] = useState<ScheduleClass[]>(SCHEDULE_CLASSES);

  // Search & Filter states
  const [memberSearch, setMemberSearch] = useState('');
  const [memberTierFilter, setMemberTierFilter] = useState('All');
  const [leadFilter, setLeadFilter] = useState('All');

  // Modal states
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddScanModal, setShowAddScanModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  // Forms
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 'Pro Performance' as AdminMember['tier'],
    assignedCoach: 'Coach Raqib Aalam',
    monthlyFee: 8499
  });

  const [newScan, setNewScan] = useState({
    memberName: members[0]?.name || 'Arjun Sharma',
    weightKg: 78.5,
    skeletalMuscleKg: 38.0,
    bodyFatPercent: 14.5,
    visceralFatLevel: 4,
    coachRemarks: ''
  });

  const [newClass, setNewClass] = useState({
    title: '',
    time: '07:00 - 08:15',
    coach: 'Coach Raqib Aalam',
    category: 'Strength' as ScheduleClass['category'],
    duration: '75 min',
    capacity: 12,
    day: 'Mon' as ScheduleClass['day']
  });

  // Financial calculations
  const totalMonthlyRevenue = members.reduce((acc, m) => m.status === 'Active' ? acc + m.monthlyFee : acc, 0) + 4820000;
  const activeMembersCount = members.filter(m => m.status === 'Active').length + 1414;
  const pendingLeadsCount = leads.filter(l => l.status === 'Pending').length;

  // Handlers
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.phone) {
      showToast({ type: 'error', title: 'Name and phone required' });
      return;
    }
    const member: AdminMember = {
      id: `MEM-${Math.floor(10 + Math.random() * 90)}`,
      name: newMember.name,
      email: newMember.email || `${newMember.name.toLowerCase().replace(/\s+/g, '')}@athlete.in`,
      phone: newMember.phone,
      tier: newMember.tier,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      assignedCoach: newMember.assignedCoach,
      streakDays: 1,
      lastCheckIn: 'Today (Orientation)',
      monthlyFee: newMember.monthlyFee
    };
    setMembers([member, ...members]);
    setShowAddMemberModal(false);
    setNewMember({
      name: '',
      email: '',
      phone: '',
      tier: 'Pro Performance',
      assignedCoach: 'Coach Raqib Aalam',
      monthlyFee: 8499
    });
    showToast({
      type: 'success',
      title: 'Member Enrolled!',
      message: `${member.name} registered under ${member.tier}. RFID badge authorized.`
    });
  };

  const handleUpdateLeadStatus = (leadId: string, nextStatus: LeadTrial['status']) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: nextStatus } : l));
    showToast({
      type: 'info',
      title: 'Lead Status Updated',
      message: `Marked as ${nextStatus}.`
    });
  };

  const handleConvertLeadToMember = (lead: LeadTrial) => {
    const member: AdminMember = {
      id: `MEM-${Math.floor(10 + Math.random() * 90)}`,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      tier: 'Pro Performance',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      assignedCoach: 'Coach Raqib Aalam',
      streakDays: 1,
      lastCheckIn: 'Trial Converted',
      monthlyFee: 8499
    };
    setMembers([member, ...members]);
    setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'Converted' } : l));
    showToast({
      type: 'success',
      title: 'Lead Converted to Club Member!',
      message: `${lead.name} has been enrolled in the active club roster.`
    });
  };

  const handleToggleMemberStatus = (id: string) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Active' ? 'Frozen' : 'Active';
        showToast({
          type: 'info',
          title: `Member ${nextStatus}`,
          message: `${m.name} is now ${nextStatus.toLowerCase()}.`
        });
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const handleAddScan = (e: React.FormEvent) => {
    e.preventDefault();
    const scan: InBodyScanRecord = {
      id: `SCAN-${Math.floor(100 + Math.random() * 900)}`,
      memberName: newScan.memberName,
      date: new Date().toISOString().split('T')[0],
      weightKg: Number(newScan.weightKg),
      skeletalMuscleKg: Number(newScan.skeletalMuscleKg),
      bodyFatPercent: Number(newScan.bodyFatPercent),
      visceralFatLevel: Number(newScan.visceralFatLevel),
      coachRemarks: newScan.coachRemarks || 'Clinical bio-impedance logged. Macro recalibrated.'
    };
    setScans([scan, ...scans]);
    setShowAddScanModal(false);
    showToast({
      type: 'success',
      title: 'InBody 770 Scan Recorded',
      message: `Bio-impedance logged for ${scan.memberName}.`
    });
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.title) return;
    const session: ScheduleClass = {
      id: `CLS-${Math.floor(100 + Math.random() * 900)}`,
      title: newClass.title,
      time: newClass.time,
      coach: newClass.coach,
      category: newClass.category,
      duration: newClass.duration,
      capacity: Number(newClass.capacity),
      spotsLeft: Number(newClass.capacity),
      day: newClass.day
    };
    setClasses([...classes, session]);
    setShowAddClassModal(false);
    showToast({
      type: 'success',
      title: 'Platform Class Scheduled',
      message: `${session.title} added to ${session.day} schedule.`
    });
  };

  // Filtered lists
  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                          m.phone.includes(memberSearch) ||
                          m.email.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesTier = memberTierFilter === 'All' || m.tier === memberTierFilter;
    return matchesSearch && matchesTier;
  });

  const filteredLeads = leadFilter === 'All'
    ? leads
    : leads.filter(l => l.status === leadFilter);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      
      {/* Top Admin Navigation Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToWebsite}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Club Website</span>
            </button>

            <div className="h-4 w-px bg-neutral-800" />

            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base text-white tracking-tight uppercase">
                Raqib Aalam
              </span>
              <span className="text-[10px] font-mono font-bold bg-amber-400 text-neutral-950 px-2 py-0.5 rounded uppercase">
                HQ Admin Command
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>HQ Floor Link: Online</span>
            </div>

            <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 text-xs">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-neutral-200 font-medium">Coach Raqib (Master Admin)</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-2 border-t border-neutral-800/60">
          {[
            { id: 'dashboard', label: 'Dashboard & Floor', icon: Activity },
            { id: 'members', label: `Members (${members.length})`, icon: Users },
            { id: 'leads', label: `Trial Leads (${leads.length})`, icon: UserCheck, badge: pendingLeadsCount },
            { id: 'schedule', label: 'Class Schedule', icon: Calendar },
            { id: 'inbody', label: 'InBody 770 Scans', icon: Dumbbell },
            { id: 'revenue', label: 'Revenue & Audit', icon: IndianRupee },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-neutral-950 text-amber-400' : 'bg-amber-400 text-neutral-950'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* ==================== TAB 1: DASHBOARD ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Total Active Athletes</span>
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-extrabold text-3xl text-white font-mono tabular-nums">
                    {activeMembersCount.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">+18 this month</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">Delhi, Mumbai & Bengaluru branches</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Monthly Recurring Rev</span>
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-xs text-neutral-400 font-bold">₹</span>
                  <span className="font-display font-extrabold text-3xl text-white font-mono tabular-nums">
                    {(totalMonthlyRevenue / 100000).toFixed(1)}L
                  </span>
                  <span className="text-xs text-neutral-400">/ mo</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">98.2% on-time subscription collection</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Today Floor Check-Ins</span>
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-extrabold text-3xl text-cyan-400 font-mono tabular-nums">184</span>
                  <span className="text-xs text-neutral-400">athletes logged</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">Peak window: 06:30 - 08:30 AM</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Pending Trial Passes</span>
                  <UserCheck className="w-4 h-4 text-rose-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display font-extrabold text-3xl text-rose-400 font-mono tabular-nums">
                    {pendingLeadsCount}
                  </span>
                  <span className="text-xs text-neutral-400">require contact</span>
                </div>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-[11px] text-amber-400 hover:text-white mt-1 block font-medium transition-colors"
                >
                  Review Inbound Leads →
                </button>
              </div>
            </div>

            {/* Live Floor Real-Time Status & Thermal Diagnostics */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">Live Floor Diagnostics</span>
                  <h3 className="font-display font-bold text-xl text-white mt-0.5">Physical Facility Status</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-neutral-300">All 4 Zones Operational</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Olympic Eleiko Racks</span>
                    <span className="text-amber-400 font-mono font-bold">12 / 16 Racks</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[75%]" />
                  </div>
                  <span className="text-[10px] text-neutral-500 block">4 platforms open on Platform Deck A</span>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">4°C Chilled Cold Plunge</span>
                    <span className="text-cyan-400 font-mono font-bold">4.2°C Active</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[95%]" />
                  </div>
                  <span className="text-[10px] text-neutral-500 block">Continuous ozone filtration nominal</span>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Finnish Cedar Sauna</span>
                    <span className="text-orange-400 font-mono font-bold">88.5°C Heat</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full w-[90%]" />
                  </div>
                  <span className="text-[10px] text-neutral-500 block">Cedar wood hygrometry optimal</span>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Indoor Sprint Turf</span>
                    <span className="text-emerald-400 font-mono font-bold">4 Athletes</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[40%]" />
                  </div>
                  <span className="text-[10px] text-neutral-500 block">Sled track clear for sprint waves</span>
                </div>
              </div>
            </div>

            {/* Quick Action Tables Grid: Recent Leads & Recent Check-Ins */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Inbound Leads Queue */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h4 className="font-display font-bold text-base text-white">Latest Inbound Trial Passes</h4>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-amber-400 hover:text-white font-semibold transition-colors"
                  >
                    View All Leads ({leads.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {leads.slice(0, 3).map((lead) => (
                    <div key={lead.id} className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-white">{lead.name}</p>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            lead.status === 'Pending' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{lead.phone} · {lead.goal}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20Coach%20Raqib%20Aalam%20here%20regarding%20your%201-Day%20Performance%20Pass`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleConvertLeadToMember(lead)}
                          className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Convert
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Member Check-Ins */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h4 className="font-display font-bold text-base text-white">Active Floor Athletes</h4>
                  <button
                    onClick={() => setActiveTab('members')}
                    className="text-xs text-amber-400 hover:text-white font-semibold transition-colors"
                  >
                    Manage Roster ({members.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {members.slice(0, 3).map((m) => (
                    <div key={m.id} className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-white">{m.name}</p>
                          <span className="text-[10px] text-amber-400 font-mono">{m.tier}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">Coach: {m.assignedCoach} · Streak: {m.streakDays}d</p>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-mono text-emerald-400 block">{m.lastCheckIn}</span>
                        <span className="text-[10px] text-neutral-500">{m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== TAB 2: MEMBERS MANAGEMENT ==================== */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">Club Member Directory</h2>
                <p className="text-xs text-neutral-400">Total {members.length} registered profiles with assigned coaching faculty</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll New Member</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Search athlete by name, phone or email..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-neutral-500 font-medium">Tier:</span>
                <select
                  value={memberTierFilter}
                  onChange={(e) => setMemberTierFilter(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="All">All Tiers</option>
                  <option value="Club Athlete">Club Athlete (₹4,999)</option>
                  <option value="Pro Performance">Pro Performance (₹8,499)</option>
                  <option value="VIP Mentorship">VIP Mentorship (₹18,999)</option>
                </select>
              </div>
            </div>

            {/* Members Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Athlete</th>
                      <th className="py-3.5 px-4 font-semibold">Tier & Fee</th>
                      <th className="py-3.5 px-4 font-semibold">Assigned Coach</th>
                      <th className="py-3.5 px-4 font-semibold">Streak</th>
                      <th className="py-3.5 px-4 font-semibold">Last Floor Check-In</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-neutral-950/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white">{m.name}</p>
                          <p className="text-[11px] text-neutral-400 font-mono">{m.phone} · {m.email}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`font-semibold ${
                            m.tier === 'VIP Mentorship' ? 'text-amber-400' :
                            m.tier === 'Pro Performance' ? 'text-white' : 'text-neutral-400'
                          }`}>
                            {m.tier}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-mono block">₹{m.monthlyFee.toLocaleString('en-IN')}/mo</span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-300">
                          {m.assignedCoach}
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          <span className="text-amber-400 font-bold">{m.streakDays}</span> days
                        </td>
                        <td className="py-3.5 px-4 font-mono text-neutral-400">
                          {m.lastCheckIn}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                            m.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            m.status === 'Frozen' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-neutral-800 text-neutral-500'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleToggleMemberStatus(m.id)}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            {m.status === 'Active' ? 'Freeze' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: LEADS & TRIAL PASSES ==================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">Inbound Trial Pass Inquiries</h2>
                <p className="text-xs text-neutral-400">Leads generated via the &quot;Claim 1-Day Performance Pass&quot; funnels</p>
              </div>

              {/* Status Filter buttons */}
              <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto">
                {['All', 'Pending', 'Contacted', 'Confirmed', 'Attended', 'Converted'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadFilter(st)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                      leadFilter === st
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-neutral-800">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">{lead.id} · {lead.submittedAt}</span>
                        <h3 className="font-display font-bold text-lg text-white mt-0.5">{lead.name}</h3>
                        <p className="text-xs text-amber-400 font-mono mt-0.5">{lead.phone} · {lead.email}</p>
                      </div>

                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadTrial['status'])}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                          lead.status === 'Pending' ? 'bg-rose-950/40 text-rose-300 border-rose-500/30' :
                          lead.status === 'Contacted' ? 'bg-amber-950/40 text-amber-300 border-amber-500/30' :
                          lead.status === 'Converted' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' :
                          'bg-neutral-950 text-neutral-300 border-neutral-800'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Attended">Attended</option>
                        <option value="Converted">Converted</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                      <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-500 uppercase block">Branch Requested</span>
                        <span className="text-white font-medium truncate block">{lead.branch}</span>
                      </div>
                      <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-[10px] text-neutral-500 uppercase block">Preferred Window</span>
                        <span className="text-white font-medium truncate block">{lead.slot}</span>
                      </div>
                    </div>

                    <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/80 text-xs">
                      <span className="text-[10px] text-neutral-500 uppercase block">Target Goal & Notes</span>
                      <p className="text-neutral-300 mt-0.5 leading-relaxed">{lead.notes || lead.goal}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20Coach%20Raqib%20Aalam%20here%20from%20the%20Athletic%20Club.%20Confirming%20your%201-Day%20Pass.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Athlete</span>
                    </a>

                    {lead.status !== 'Converted' && (
                      <button
                        onClick={() => handleConvertLeadToMember(lead)}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Enroll as Member
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: SCHEDULE MANAGEMENT ==================== */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">Platform Class Management</h2>
                <p className="text-xs text-neutral-400">Weekly barbell waves, conditioning circuits, and mobility hours</p>
              </div>

              <button
                onClick={() => setShowAddClassModal(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule New Session</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classes.map((cls) => (
                <div key={cls.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold">{cls.day} · {cls.time}</span>
                    <span className="text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded">
                      {cls.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white">{cls.title}</h3>
                  <p className="text-xs text-neutral-400">Coach: {cls.coach} · Duration: {cls.duration}</p>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-neutral-800">
                    <span className="text-neutral-400">Platform Cap: <strong className="text-white">{cls.capacity} lifters</strong></span>
                    <button
                      onClick={() => {
                        setClasses(classes.filter(c => c.id !== cls.id));
                        showToast({ type: 'info', title: 'Class Session Removed' });
                      }}
                      className="text-rose-400 hover:text-white transition-colors cursor-pointer text-[11px]"
                    >
                      Cancel Slot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: INBODY 770 BIO-SCANS ==================== */}
        {activeTab === 'inbody' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">InBody 770 Clinical Scan Ledger</h2>
                <p className="text-xs text-neutral-400">Multi-frequency bio-impedance composition records and coach cues</p>
              </div>

              <button
                onClick={() => setShowAddScanModal(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log New Biometric Scan</span>
              </button>
            </div>

            <div className="space-y-4">
              {scans.map((scan) => (
                <div key={scan.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">{scan.id} · Audit Date: {scan.date}</span>
                      <h3 className="font-display font-bold text-lg text-white mt-0.5">{scan.memberName}</h3>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      InBody 770 Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Scale Weight</span>
                      <span className="font-mono font-bold text-white text-base">{scan.weightKg} kg</span>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Skeletal Muscle</span>
                      <span className="font-mono font-bold text-emerald-400 text-base">{scan.skeletalMuscleKg} kg</span>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Body Fat %</span>
                      <span className="font-mono font-bold text-amber-400 text-base">{scan.bodyFatPercent}%</span>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Visceral Fat Level</span>
                      <span className="font-mono font-bold text-sky-400 text-base">Level {scan.visceralFatLevel}</span>
                    </div>
                  </div>

                  <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300">
                    <strong className="text-amber-400 font-mono uppercase text-[10px] block mb-0.5">Coach Raqib Remarks:</strong>
                    <span>{scan.coachRemarks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 6: REVENUE & FINANCIAL AUDIT ==================== */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-white">Financial & Membership Revenue</h2>
                <p className="text-xs text-neutral-400">Monthly recurring billing, tier splits, and audit exports</p>
              </div>

              <button
                onClick={() => {
                  showToast({
                    type: 'success',
                    title: 'Financial CSV Exported',
                    message: 'Monthly membership billing ledger downloaded.'
                  });
                }}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Revenue Ledger (.CSV)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-2">
                <span className="text-xs text-neutral-400 block uppercase font-mono">VIP Raqib Mentorship (₹18,999)</span>
                <p className="font-display font-extrabold text-3xl text-amber-400 font-mono">₹22.8 Lakhs</p>
                <p className="text-xs text-neutral-500">120 active executive athletes</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-2">
                <span className="text-xs text-neutral-400 block uppercase font-mono">Pro Performance Tier (₹8,499)</span>
                <p className="font-display font-extrabold text-3xl text-white font-mono">₹21.2 Lakhs</p>
                <p className="text-xs text-neutral-500">250 athletes with sauna & floor coaching</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-2">
                <span className="text-xs text-neutral-400 block uppercase font-mono">Club Athlete Tier (₹4,999)</span>
                <p className="font-display font-extrabold text-3xl text-emerald-400 font-mono">₹7.8 Lakhs</p>
                <p className="text-xs text-neutral-500">156 open platform members</p>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-display font-bold text-xl text-white">Quarterly Collection Health</h3>
              <p className="text-xs text-neutral-400 max-w-xl">
                Average athlete tenure at Raqib Aalam Athletic Club is 14.8 months, significantly above commercial gym averages (3.2 months) due to measured InBody progression and direct coaching accountability.
              </p>
              <div className="w-full bg-neutral-950 h-3 rounded-full overflow-hidden flex border border-neutral-800">
                <div className="bg-amber-400 h-full w-[44%]" title="VIP Mentorship" />
                <div className="bg-neutral-200 h-full w-[41%]" title="Pro Performance" />
                <div className="bg-emerald-400 h-full w-[15%]" title="Club Athlete" />
              </div>
              <div className="flex flex-wrap gap-6 text-xs text-neutral-400 pt-2 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>VIP Mentorship: 44%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                  <span>Pro Performance: 41%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Club Athlete: 15%</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL: Add New Member */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-neutral-100">
            <button
              onClick={() => setShowAddMemberModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-xl text-white mb-4">Enroll New Club Athlete</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Athlete Full Name</label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="e.g. Siddharth Roy"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  placeholder="+91 98202 34567"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  placeholder="athlete@example.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Membership Tier</label>
                  <select
                    value={newMember.tier}
                    onChange={(e) => {
                      const tier = e.target.value as AdminMember['tier'];
                      const fee = tier === 'VIP Mentorship' ? 18999 : tier === 'Pro Performance' ? 8499 : 4999;
                      setNewMember({ ...newMember, tier, monthlyFee: fee });
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Club Athlete">Club Athlete</option>
                    <option value="Pro Performance">Pro Performance</option>
                    <option value="VIP Mentorship">VIP Mentorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Assigned Coach</label>
                  <select
                    value={newMember.assignedCoach}
                    onChange={(e) => setNewMember({ ...newMember, assignedCoach: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Coach Raqib Aalam">Coach Raqib Aalam</option>
                    <option value="Kavita Singh (CSCS)">Kavita Singh (CSCS)</option>
                    <option value="Dr. Tariq Anwar">Dr. Tariq Anwar</option>
                    <option value="Sameer Sheikh">Sameer Sheikh</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs mt-2 transition-colors cursor-pointer"
              >
                Confirm Enrollment & Issue RFID
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Log InBody Scan */}
      {showAddScanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-neutral-100">
            <button
              onClick={() => setShowAddScanModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-xl text-white mb-4">Record InBody 770 Scan</h3>
            <form onSubmit={handleAddScan} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Select Member</label>
                <select
                  value={newScan.memberName}
                  onChange={(e) => setNewScan({ ...newScan, memberName: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {members.map(m => (
                    <option key={m.id} value={m.name}>{m.name} ({m.tier})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Total Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newScan.weightKg}
                    onChange={(e) => setNewScan({ ...newScan, weightKg: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Skeletal Muscle (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newScan.skeletalMuscleKg}
                    onChange={(e) => setNewScan({ ...newScan, skeletalMuscleKg: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Body Fat %</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newScan.bodyFatPercent}
                    onChange={(e) => setNewScan({ ...newScan, bodyFatPercent: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Visceral Fat Level (1-20)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={newScan.visceralFatLevel}
                    onChange={(e) => setNewScan({ ...newScan, visceralFatLevel: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Coach Notes & Prescription</label>
                <textarea
                  rows={2}
                  value={newScan.coachRemarks}
                  onChange={(e) => setNewScan({ ...newScan, coachRemarks: e.target.value })}
                  placeholder="Observations on muscle symmetry, water balance, and caloric adjustment..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs mt-2 transition-colors cursor-pointer"
              >
                Save Biometric Audit to Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Scheduled Class */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-neutral-100">
            <button
              onClick={() => setShowAddClassModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display font-bold text-xl text-white mb-4">Add Scheduled Platform Clinic</h3>
            <form onSubmit={handleAddClass} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  placeholder="e.g. Barbell Squat Mechanics Wave"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Day</label>
                  <select
                    value={newClass.day}
                    onChange={(e) => setNewClass({ ...newClass, day: e.target.value as ScheduleClass['day'] })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Mon">Monday</option>
                    <option value="Tue">Tuesday</option>
                    <option value="Wed">Wednesday</option>
                    <option value="Thu">Thursday</option>
                    <option value="Fri">Friday</option>
                    <option value="Sat">Saturday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Time Window</label>
                  <input
                    type="text"
                    required
                    value={newClass.time}
                    onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                    placeholder="06:30 - 07:45"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Lead Coach</label>
                  <select
                    value={newClass.coach}
                    onChange={(e) => setNewClass({ ...newClass, coach: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Coach Raqib Aalam">Coach Raqib Aalam</option>
                    <option value="Kavita Singh (CSCS)">Kavita Singh (CSCS)</option>
                    <option value="Sameer Sheikh">Sameer Sheikh</option>
                    <option value="Dr. Tariq Anwar">Dr. Tariq Anwar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Max Lifters Cap</label>
                  <input
                    type="number"
                    min="4"
                    max="20"
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({ ...newClass, capacity: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg text-xs mt-2 transition-colors cursor-pointer"
              >
                Publish to Floor Schedule
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
