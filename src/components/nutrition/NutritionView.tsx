import React, { useState } from 'react';
import {
  Apple,
  Plus,
  Droplets,
  Sparkles,
  CheckCircle2,
  Minus,
  UtensilsCrossed,
  Clock,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import nutritionPlateImg from '../../assets/images/nutrition_fresh_plate_1790695693646.jpg';

export const NutritionView: React.FC = () => {
  const {
    meals,
    addMeal,
    waterGlasses,
    incrementWater,
    decrementWater,
    profile
  } = useApp();

  const [showLogMealModal, setShowLogMealModal] = useState(false);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['protein', 'vegetables']);

  const categoryOptions = [
    { id: 'protein', label: 'Protein (Eggs, Tofu, Salmon, Lentils)' },
    { id: 'vegetables', label: 'Vegetables (Greens, Broccoli, Peppers)' },
    { id: 'fruits', label: 'Fruits (Berries, Citrus, Apples)' },
    { id: 'whole-grains', label: 'Whole Grains (Quinoa, Oats, Brown Rice)' },
    { id: 'healthy-fats', label: 'Healthy Fats (Avocado, Olive Oil, Nuts)' },
  ];

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSaveMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;
    addMeal({
      date: '2026-09-29',
      mealType,
      description,
      categories: selectedCategories,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setDescription('');
    setShowLogMealModal(false);
  };

  const mealSlots: { id: 'breakfast' | 'lunch' | 'dinner' | 'snacks'; label: string; icon: string }[] = [
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' },
    { id: 'snacks', label: 'Snacks & Beverages', icon: '🍵' },
  ];

  return (
    <div className="space-y-7 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Today's Nutrition
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Nourish your hormone rhythm with wholesome, nutrient-dense plates.
          </p>
        </div>

        <button
          onClick={() => setShowLogMealModal(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-800 active:scale-95 transition-all self-start md:self-auto"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Log Meal</span>
        </button>
      </div>

      {/* Hero Visual & Hydration Card Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left (8 cols): Balanced Plate Visual + Highlights */}
        <div className="lg:col-span-8 rounded-3xl border border-[#EAE4DC] bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row gap-5 items-center">
          <div className="w-full sm:w-1/2 h-44 sm:h-48 rounded-2xl overflow-hidden relative shrink-0">
            <img
              src={nutritionPlateImg}
              alt="Nourishing wholesome wellness bowl"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-200">
                Today's Balance Focus
              </span>
              <p className="font-editorial text-sm font-bold">Protein & High-Fiber Greens</p>
            </div>
          </div>

          <div className="space-y-2.5 flex-1">
            <h3 className="font-editorial text-lg font-bold text-slate-900">
              The 5 Balanced Nutrition Pillars
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When each main meal includes quality protein, colorful fiber, and slow carbs, your blood sugar and luteal progesterone remain naturally steady.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {['25g Protein', '2 Cups Vegetables', '1 Serving Berries', 'Complex Whole Grains', 'Healthy Fats'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-teal-50 px-2 py-1 text-[11px] font-medium text-teal-800 border border-teal-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right (4 cols): Water Hydration Tracker Card */}
        <div className="lg:col-span-4 rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Daily Hydration</span>
              <Droplets className="h-5 w-5 text-teal-500" />
            </div>

            <div className="mt-4 text-center">
              <div className="font-mono text-3xl font-bold text-slate-900 tabular-nums">
                {waterGlasses} <span className="text-lg font-normal text-slate-400">/ {profile.waterGlassesGoal || 8} glasses</span>
              </div>
              <p className="text-xs text-teal-700 font-medium mt-1">
                {waterGlasses >= (profile.waterGlassesGoal || 8)
                  ? 'Goal reached! Wonderful hydration.'
                  : `${(profile.waterGlassesGoal || 8) - waterGlasses} glasses left for today`}
              </p>
            </div>

            {/* Quick glass icons visualization */}
            <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
              {Array.from({ length: profile.waterGlassesGoal || 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-7 w-5 rounded-md flex items-center justify-center transition-all ${
                    i < waterGlasses ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-300'
                  }`}
                >
                  <Droplets className="h-3 w-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={decrementWater}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={incrementWater}
              className="flex-1 flex h-8 items-center justify-center gap-1.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Log +1 Glass</span>
            </button>
          </div>
        </div>
      </div>

      {/* Meal Cards: Breakfast, Lunch, Dinner, Snacks */}
      <div className="space-y-4">
        <h2 className="font-editorial text-xl font-bold text-slate-900">
          Logged Meals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mealSlots.map((slot) => {
            const slotMeals = meals.filter((m) => m.mealType === slot.id);
            return (
              <div
                key={slot.id}
                className="rounded-3xl border border-[#EAE4DC] bg-white p-5 shadow-xs flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{slot.icon}</span>
                      <span className="text-xs font-bold text-slate-800">{slot.label}</span>
                    </div>
                    {slotMeals.length > 0 && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        {slotMeals[0].time}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    {slotMeals.length > 0 ? (
                      <div className="space-y-2">
                        {slotMeals.map((m) => (
                          <div key={m.id} className="space-y-1.5">
                            <p className="text-xs font-medium text-slate-800 leading-snug">
                              {m.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {m.categories.map((c) => (
                                <span
                                  key={c}
                                  className="text-[10px] font-medium text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded capitalize"
                                >
                                  {c.replace('-', ' ')}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-slate-400">
                        <UtensilsCrossed className="mx-auto h-5 w-5 stroke-[1.5] mb-1 text-slate-300" />
                        <span className="text-xs">No {slot.label.toLowerCase()} logged yet</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setMealType(slot.id);
                      setShowLogMealModal(true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1 rounded-xl bg-slate-50 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add {slot.label}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Healthy Habit Suggestions */}
      <div className="rounded-3xl border border-[#EAE4DC] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-teal-600" />
          <h3 className="font-editorial text-lg font-bold text-slate-900">
            Healthy Habit Suggestions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-slate-200/80">
            <h5 className="font-bold text-slate-800 mb-1">Pair Carbs with Healthy Fats</h5>
            <p className="text-[11px] leading-relaxed">
              Adding avocado, pumpkin seeds, or olive oil to grains slows carbohydrate absorption, preventing afternoon energy crashes.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-slate-200/80">
            <h5 className="font-bold text-slate-800 mb-1">Prioritize Magnesium-Rich Greens</h5>
            <p className="text-[11px] leading-relaxed">
              Dark leafy spinach, chard, pumpkin seeds, and raw cacao support calm muscle tone and soothe cycle cramping.
            </p>
          </div>

          <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-slate-200/80">
            <h5 className="font-bold text-slate-800 mb-1">Morning Water Ritual</h5>
            <p className="text-[11px] leading-relaxed">
              Drink 1 full glass of lukewarm lemon or filtered water before your morning coffee to aid gentle digestive awakening.
            </p>
          </div>
        </div>
      </div>

      {/* Log Meal Modal */}
      {showLogMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF8F5] p-6 shadow-2xl border border-[#EAE4DC]">
            <h3 className="font-editorial text-xl font-bold text-slate-900">Log Nourishing Meal</h3>
            <p className="text-xs text-slate-500 mt-0.5">Keep track of mindful food combinations</p>

            <form onSubmit={handleSaveMeal} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Meal Slot</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMealType(type)}
                      className={`rounded-xl py-2 px-1 text-xs capitalize text-center ${
                        mealType === type
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">What did you enjoy?</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Scrambled organic eggs with sautéed spinach, sourdough toast, and avocado"
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nutrition Categories</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {categoryOptions.map((cat) => {
                    const isChecked = selectedCategories.includes(cat.id);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`cursor-pointer flex items-center justify-between rounded-xl px-3 py-2 text-xs border transition-colors ${
                          isChecked
                            ? 'bg-teal-50 border-teal-600 font-semibold text-teal-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isChecked && <CheckCircle2 className="h-4 w-4 text-teal-700" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowLogMealModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-teal-700 px-5 py-2 text-xs font-bold text-white hover:bg-teal-800"
                >
                  Record Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
