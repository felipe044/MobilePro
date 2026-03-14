/**
 * Tela Adicionar Gasto
 * Campos: título, valor, categoria + botão salvar + criar nova categoria
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { Container } from '../../../core/Container';
import { Expense } from '../../../data/models/Expense';
import { EXPENSE_CATEGORIES } from '../../../data/models/Expense';
import type { ExpenseViewModel } from '../../viewmodels/ExpenseViewModel';
import styles from './AddExpenseScreen.styles';

const generateId = (): string => Date.now().toString() + Math.random().toString(36).slice(2);

interface AddExpenseScreenProps {
  navigation: {
    goBack: () => void;
  };
}

export function AddExpenseScreen({ navigation }: AddExpenseScreenProps) {
  const viewModel = Container.getInstance().resolve<ExpenseViewModel>('ExpenseViewModel');

  const [nm_despesa, setNmDespesa] = useState('');
  const [vlr_despesa, setVlrDespesa] = useState('');
  const categories = viewModel.getCategories();
  const [tp_despesa, setTpDespesa] = useState(
    categories.length > 0 ? categories[0] : EXPENSE_CATEGORIES[0]
  );
  const [newCategory, setNewCategory] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddCategory = useCallback(() => {
    const trimmed = newCategory.trim();
    if (!trimmed) {
      Alert.alert('Erro', 'Informe o nome da categoria');
      return;
    }
    viewModel.addCategory(trimmed);
    setTpDespesa(trimmed);
    setNewCategory('');
    setRefreshKey((k) => k + 1);
  }, [viewModel, newCategory]);

  const handleRemoveCategory = useCallback(
    (cat: string) => {
      const cats = viewModel.getCategories();
      if (cats.length <= 1) {
        Alert.alert('Aviso', 'É necessário manter pelo menos uma categoria.');
        return;
      }
      Alert.alert('Excluir categoria', `Excluir "${cat}" da lista?`, [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            viewModel.removeCategory(cat);
            const remaining = viewModel.getCategories();
            setTpDespesa(remaining[0] ?? '');
            setRefreshKey((k) => k + 1);
          },
        },
      ]);
    },
    [viewModel]
  );

  const handleSave = () => {
    const value = parseFloat(vlr_despesa.replace(',', '.'));
    if (!nm_despesa.trim()) {
      Alert.alert('Erro', 'Informe o título da despesa');
      return;
    }
    if (isNaN(value)) {
      Alert.alert('Erro', 'Informe um valor válido');
      return;
    }
    if (value < 0) {
      Alert.alert('Erro', 'O valor não pode ser negativo');
      return;
    }

    try {
      const expense: Expense = {
        id: generateId(),
        nm_despesa: nm_despesa.trim(),
        vlr_despesa: value,
        tp_despesa,
        data: new Date().toISOString(),
      };
      viewModel.addExpense(expense);
      Alert.alert('Sucesso', 'Gasto adicionado!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro ao salvar');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={nm_despesa}
          onChangeText={setNmDespesa}
          placeholder="Ex: Almoço, Supermercado..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          value={vlr_despesa}
          onChangeText={setVlrDespesa}
          placeholder="0,00"
          placeholderTextColor="#94A3B8"
          keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'numeric'}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Categoria</Text>
        <Text style={styles.hint}>Toque para selecionar • Excluir para remover</Text>
        <View style={[styles.card, styles.picker]} key={refreshKey}>
          {viewModel.getCategories().map((cat, index, arr) => (
            <View
              key={cat}
              style={[
                styles.categoryRow,
                index === arr.length - 1 && styles.categoryRowLast,
              ]}
            >
              <TouchableOpacity
                onPress={() => setTpDespesa(cat)}
                style={{ flex: 1 }}
              >
                <Text
                  style={[
                    styles.categoryText,
                    tp_despesa === cat && styles.categoryTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteCategoryButton}
                onPress={() => handleRemoveCategory(cat)}
              >
                <Text style={styles.deleteCategoryText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Nova categoria</Text>
        <View style={styles.newCategoryRow}>
          <TextInput
            style={styles.newCategoryInput}
            value={newCategory}
            onChangeText={setNewCategory}
            placeholder="Ex: Educação, Pets..."
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity
            style={styles.addCategoryButton}
            onPress={handleAddCategory}
            activeOpacity={0.85}
          >
            <Text style={styles.addCategoryButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        activeOpacity={0.85}
      >
        <Text style={styles.saveButtonText}>Salvar gasto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
