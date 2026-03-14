/**
 * Estilos da tela Adicionar Gasto - Mesmo padrão UI/UX da Home
 * Paleta consistente, cards com sombra, hierarquia visual
 */
import { StyleSheet, Platform } from 'react-native';

export const colors = {
  background: '#F5F7FA',
  surface: '#FFFFFF',
  primary: '#0D9488',
  primaryDark: '#0F766E',
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  success: '#059669',
  danger: '#DC2626',
  dangerBg: '#FEF2F2',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
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
  picker: {
    marginTop: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  categoryRowLast: {
    borderBottomWidth: 0,
  },
  categoryText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  deleteCategoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.dangerBg,
    borderRadius: 8,
  },
  deleteCategoryText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '600',
  },
  newCategoryRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  newCategoryInput: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addCategoryButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.success,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  addCategoryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 14,
    marginTop: 32,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 4,
  },
});
