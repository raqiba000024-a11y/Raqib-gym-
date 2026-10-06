import React, { useState } from 'react';
import { SCHEDULE_CLASSES } from '../data/gymData';
import { Clock, User, Flame, Calendar, Check, ArrowRight } from 'lucide-react';
import { useToast } from '../components/Toast';

interface ScheduleViewProps {
  onOpenTrialModal: () => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onOpenTrialModal }) => {
  const { showToast } = useToast();
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Sat'>('Mon');
  const [bookedClasses, setBookedClasses] = useState<string[]>([]);

  const filteredClasses = SCHEDULE_CLASSES.filter(c => c.day === selectedDay);

  const handleBook = (clsId: string, title: string) => {
    if (bookedClasses.includes(clsId)) {
      showToast({
        type: 'info',
        title: 'Already Reserved',
        message: `You are already registered for ${title}.`
      });
      return;
    }

    setBookedClasses(prev => [...prev, clsId]);
    showToast({
      type: 'success',
      title: 'Platform Slot Confirmed!',
      message: `Reserved your spot for ${title}. See you on the floor!`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 text-neutral-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-10">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>Weekly Roster</span>
            <span aria-hidden="true">·</span>
            <span>Platform Scheduling</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Class & Platform Timetable
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            All supervised barbell waves, turf conditioning circuits, and recovery clinics maintain strict athlete caps (maximum 10-14 per block) for meticulous coach attention.
          </p>
        </div>

        {/* Day of Week Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto self-start md:self-auto">
          {(['Mon', 'Tue', 'Wed', 'Sat'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedDay === day
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {day === 'Mon' ? 'Monday' : day === 'Tue' ? 'Tuesday' : day === 'Wed' ? 'Wednesday' : 'Saturday Syndicate'}
            </button>
          ))}
        </div>
      </div>

      {/* Class List Table / Cards */}
      <div className="space-y-4">
        {filteredClasses.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center text-neutral-400">
            <Calendar className="w-10 h-10 mx-auto text-neutral-600 mb-3" />
            <p className="text-base font-semibold text-white">Open Floor Lifting Hours</p>
            <p className="text-xs text-neutral-400 mt-1">
              General platform access is open continuously from 05:30 to 22:30. No formal clinics scheduled for this cycle.
            </p>
          </div>
        ) : (
          filteredClasses.map((cls) => {
            const isBooked = bookedClasses.includes(cls.id);
            const remainingSpots = isBooked ? Math.max(0, cls.spotsLeft - 1) : cls.spotsLeft;

            return (
              <div
                key={cls.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-neutral-700 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-amber-400 text-sm">{cls.time}</span>
                    <span className="text-neutral-500 font-mono">({cls.duration})</span>
                    <span className="text-xs font-semibold text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      {cls.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white">
                    {cls.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-neutral-300 font-medium">{cls.coach}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{remainingSpots} of {cls.capacity} spots remaining</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleBook(cls.id, cls.title)}
                    className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isBooked
                        ? 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    {isBooked ? 'Slot Reserved ✓' : 'Reserve Platform Slot'}
                  </button>
                  <button
                    onClick={onOpenTrialModal}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Guest Trial
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floor Hours Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-500 uppercase">Monday — Saturday</span>
            <h4 className="text-lg font-bold text-white font-mono">05:30 AM — 10:30 PM</h4>
            <p className="text-xs text-neutral-400">Olympic floor, cardio loft & Finnish recovery suite</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-500 uppercase">Sunday</span>
            <h4 className="text-lg font-bold text-white font-mono">07:00 AM — 08:00 PM</h4>
            <p className="text-xs text-neutral-400">Mobility clinics, cold plunge immersion & open lifting</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-500 uppercase">Coach Raqib Private Hours</span>
            <h4 className="text-lg font-bold text-amber-400 font-mono">By Reserved Retainer</h4>
            <p className="text-xs text-neutral-400">Direct 1-on-1 private lifting blocks</p>
          </div>
        </div>
      </div>

    </div>
  );
};
