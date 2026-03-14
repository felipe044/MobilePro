/**
 * Estilos da tela Resumo - Mesmo padrão UI/UX da Home e AddExpense
 * Paleta consistente, cards com sombra, hierarquia visual
 */
import { StyleSheet, Platform } from 'react-native';

export const colors = {
  background: '#F5F7FA',
  surface: '#FFFFFF',
  primary: '#0D9488',
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
};

const getCategoryColor = (category: string): string => {
  const map: Record<string, string> = {
    Alimentação: '#F59E0B',
    Transporte: '#3B82F6',
    Lazer: '#8B5CF6',
    Saúde: '#10B981',
    Moradia: '#EC4899',
    Outros: '#64748B',
  };
  return map[category] ?? '#64748B';
};

export const getCategoryColorFn = getCategoryColor;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  totalCard: {
    backgroundColor: colors.primary,
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#0D9488',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
  totalValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  categoryIndicator: {
    width: 4,
    borderRadius: 2,
  },
  categoryContent: {
    flex: 1,
    padding: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  categoryMeta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(13, 148, 136, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyIconText: {
    fontSize: 36,
  },
  emptyText: {
    fontSize: 17,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  emptyHint: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
});
