'use client';

import { useState, useEffect } from 'react';
import { petApi, PetResponse } from '@/services/api';
import { useApp } from '@/context/AppContext';
import { Trophy, Flame, Star, Edit2, Lock, Sparkles, TrendingUp, Award, Home, CheckSquare, Clock, Settings, HelpCircle, ChevronRight, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PetPage() {
  const router = useRouter();
  const { gameData, pet: contextPet, refreshPet } = useApp();
  const [pet, setPet] = useState<PetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  // Actualizar la mascota cada vez que cambie en el contexto
  useEffect(() => {
    if (contextPet) {
      setPet(contextPet);
      setNewName(contextPet.name);
      setLoading(false);
    } else {
      loadPet();
    }
  }, [contextPet]);

  const loadPet = async () => {
    try {
      setLoading(true);
      const petData = await petApi.get();
      setPet(petData);
      setNewName(petData.name);
    } catch (error) {
      console.error('Error loading pet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async () => {
    try {
      const updatedPet = await petApi.unlock();
      setPet(updatedPet);
      await refreshPet();
    } catch (error) {
      console.error('Error unlocking pet:', error);
    }
  };

  const handleRename = async () => {
    if (!newName.trim() || newName.length < 2 || newName.length > 20) {
      alert('El nombre debe tener entre 2 y 20 caracteres');
      return;
    }

    try {
      await petApi.rename(newName);
      setPet(prev => prev ? { ...prev, name: newName } : null);
      setEditingName(false);
      await refreshPet();
    } catch (error) {
      console.error('Error renaming pet:', error);
      alert('Error al cambiar el nombre');
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#6b7280'
      }}>
        Cargando mascota...
      </div>
    );
  }

  if (!pet) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#ef4444'
      }}>
        Error al cargar la mascota
      </div>
    );
  }

  const xpPercentage = (pet.experience / 100) * 100;
  const isMaxLevel = pet.level >= 10;

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckSquare color="#f97316" size={32} />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ea580c', margin: 0 }}>Listify</h1>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '0 16px' }}>
          <button 
            onClick={() => router.push('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', color: '#374151', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <Home size={20} />
            <span>Home</span>
          </button>
          
          <button 
            onClick={() => router.push('/tasks')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', color: '#374151', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <CheckSquare size={20} />
            <span>Task</span>
          </button>

          <button 
            onClick={() => router.push('/history')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', color: '#374151', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <Clock size={20} />
            <span>Historial</span>
          </button>

          <button 
            onClick={() => router.push('/pet')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', color: '#ef4444', backgroundColor: '#fef2f2', border: 'none', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <span style={{ fontSize: '20px' }}>🐱</span>
            <span style={{ fontWeight: '500' }}>Mascota</span>
          </button>

          <button 
            onClick={() => router.push('/settings')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', color: '#374151', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <Settings size={20} />
            <span>Configuración</span>
          </button>

          <button 
            onClick={() => router.push('/help')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', color: '#374151', backgroundColor: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
            <HelpCircle size={20} />
            <span>Centro de ayuda</span>
          </button>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#374151', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: '500' }}>
              N
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
              Mi Mascota
            </h2>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
              <User size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Sparkles size={32} color="#f59e0b" />
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  Mi Mascota
                </h1>
              </div>
              <p style={{ fontSize: '16px', color: '#6b7280' }}>
                Cuida de tu mascota y ayúdala a crecer completando tareas
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Pet Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '0 0 0 100%',
                  opacity: 0.3,
                  zIndex: 0
                }} />

                {/* Lock overlay */}
                {!pet.unlocked && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    borderRadius: '16px'
                  }}>
                    <Lock size={64} color="white" />
                    <p style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginTop: '16px', marginBottom: '8px', textAlign: 'center', padding: '0 20px' }}>
                      Mascota Bloqueada
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '24px', textAlign: 'center', padding: '0 20px' }}>
                      Completa tareas para llegar a 100 XP y desbloquear tu mascota
                    </p>
                    <div style={{ textAlign: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                      {gameData.totalExperience}/100 XP
                    </div>
                  </div>
                )}

                {/* Pet Avatar */}
                <div style={{
                  width: '180px',
                  height: '180px',
                  backgroundColor: pet.unlocked ? '#fef3c7' : '#e5e7eb',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontSize: '100px' }}>
                    {pet.unlocked ? '🐱' : '🔒'}
                  </div>
                </div>

                {/* Pet Name */}
                <div style={{ marginBottom: '16px', zIndex: 1, width: '100%', textAlign: 'center' }}>
                  {editingName ? (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        maxLength={20}
                        style={{
                          padding: '8px 12px',
                          border: '2px solid #f59e0b',
                          borderRadius: '8px',
                          fontSize: '18px',
                          fontWeight: '600',
                          textAlign: 'center',
                          outline: 'none'
                        }}
                        autoFocus
                      />
                      <button
                        onClick={handleRename}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => {
                          setEditingName(false);
                          setNewName(pet.name);
                        }}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                        {pet.name}
                      </h2>
                      {pet.unlocked && (
                        <button
                          onClick={() => setEditingName(true)}
                          style={{
                            padding: '6px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#6b7280'
                          }}
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Level Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '20px',
                  marginBottom: '24px',
                  zIndex: 1
                }}>
                  <Trophy size={20} color="#f59e0b" />
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#92400e' }}>
                    Nivel {pet.level}
                  </span>
                  {isMaxLevel && <Star size={20} color="#f59e0b" />}
                </div>

                {/* XP Progress */}
                {!isMaxLevel && pet.unlocked && (
                  <div style={{ width: '100%', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Experiencia
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#f59e0b' }}>
                        {pet.experience}/100 XP
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '12px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${xpPercentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                )}

                {isMaxLevel && (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    textAlign: 'center',
                    width: '100%',
                    zIndex: 1
                  }}>
                    <Star size={24} color="#f59e0b" style={{ marginBottom: '8px' }} />
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#92400e' }}>
                      ¡Nivel Máximo Alcanzado!
                    </div>
                    <div style={{ fontSize: '14px', color: '#78350f', marginTop: '4px' }}>
                      Tu mascota ha alcanzado su máximo potencial
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '24px' }}>
                  Estadísticas
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* User Level */}
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#fbbf24',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Trophy size={28} color="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#78350f', fontWeight: '500' }}>
                        Tu Nivel
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#92400e' }}>
                        {gameData.level}
                      </div>
                    </div>
                  </div>

                  {/* XP Progress */}
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TrendingUp size={28} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', color: '#1e3a8a', fontWeight: '500', marginBottom: '8px' }}>
                        Tu Experiencia
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
                        {gameData.xp}/{gameData.xpToNextLevel} XP
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#bfdbfe',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(gameData.xp / gameData.xpToNextLevel) * 100}%`,
                          height: '100%',
                          backgroundColor: '#3b82f6',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Streak */}
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fee2e2',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#ef4444',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Flame size={28} color="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#7f1d1d', fontWeight: '500' }}>
                        Racha
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#991b1b' }}>
                        {gameData.streak} días
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#dcfce7',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: '#10b981',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Award size={28} color="white" />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#064e3b', fontWeight: '500' }}>
                        Logros
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#065f46' }}>
                        {gameData.achievements.filter(a => a.unlocked).length}/{gameData.achievements.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                    💡 <strong>Consejo:</strong> Completa tareas para ganar experiencia. 
                    Cada tarea te da 10 XP. ¡La mascota se desbloquea automáticamente al llegar a 100 XP total!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}