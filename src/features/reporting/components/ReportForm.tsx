import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useReporting } from '../context/ReportingContext';
import { Button } from '../../../shared/components';
import { goodOptions, badOptions, goodDetails, badDetails } from '../data/reportOptions';
import { Colors, Spacing, Typography } from '../../../shared/constants';
import { Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export const ReportForm: React.FC = () => {
  const { state, setCategory, setDetails, setPhoto, submitReport, resetReport } = useReporting();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDetails, setSelectedDetails] = useState<string>('');

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // IMPORTANT: declare your state arrays with explicit types
  const [categoryItems, setCategoryItems] = useState<{ label: string; value: string }[]>([]);
  const [detailsItems, setDetailsItems] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const currentOptions = state.currentReport.type === 'good' ? goodOptions : badOptions;
    setCategoryItems(
      currentOptions.map(o => ({
        label: `${o.text}`,
        value: o.value,
      }))
    );
  }, [state.currentReport.type]);

  useEffect(() => {
    if (selectedCategory) {
      const currentDetails = state.currentReport.type === 'good' ? goodDetails : badDetails;
      const details = currentDetails[selectedCategory] || [];
      setDetailsItems(
        details.map(d => ({
          label: `${d.text}`,
          value: d.value,
        }))
      );
    } else {
      setDetailsItems([]);
    }
  }, [selectedCategory, state.currentReport.type]);

  if (!state.currentReport.type) return null;

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0].uri);
      }
    } catch {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handleSubmit = async () => {
    await submitReport();
    if (!state.error) {
      setSelectedCategory('');
      setSelectedDetails('');
      setCategory('');
      setDetails('');
      Alert.alert('Success', 'Report submitted successfully!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Category Dropdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {state.currentReport.type === 'good' ? "🌟 What's Good?" : "⚠️ What's Wrong?"}
        </Text>
        <DropDownPicker
          open={categoryOpen}
          value={selectedCategory}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={(callback) => {
            const value = callback(selectedCategory);
            setSelectedCategory(value);
            setCategory(value);
            setSelectedDetails('');
            setDetails('');
          }}
          setItems={setCategoryItems}
          placeholder="Select an option..."
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={3000}
          zIndexInverse={1000}
        />
      </View>

      {/* Details Dropdown */}
      {selectedCategory ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Specific Details</Text>
          <DropDownPicker
            open={detailsOpen}
            value={selectedDetails}
            items={detailsItems}
            setOpen={setDetailsOpen}
            setValue={(callback) => {
              const value = callback(selectedDetails);
              setSelectedDetails(value);
              setDetails(value);
            }}
            setItems={setDetailsItems}
            placeholder="Select details..."
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </View>
      ) : null}

      {/* Photo Section */}
      {selectedDetails ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📸 Capture Photo</Text>
          {state.currentReport.photo ? (
            <View style={styles.photoContainer}>
              <View style={styles.photoWrapper}>
                <Image source={{ uri: state.currentReport.photo }} style={styles.photo} />
                <TouchableOpacity style={styles.removePhotoButton} onPress={() => setPhoto('')}>
                  <Text style={styles.removePhotoButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              <Button
                title="🔄 Retake Photo"
                onPress={handleTakePhoto}
                variant="secondary"
                size="small"
              />
            </View>
          ) : (
            <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
              <Camera size={24} color={Colors.neutral.white} />
              <Text style={styles.cameraButtonText}>📷 Document It</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}

      {/* Submit */}
      {selectedDetails ? (
        <View style={styles.submitSection}>
          {state.error ? <Text style={styles.errorText}>{state.error}</Text> : null}
          <Button
            title="Submit Report"
            onPress={handleSubmit}
            loading={state.isSubmitting}
            style={styles.submitButton}
          />
          <Button
            title="Reset Form"
            onPress={resetReport}
            variant="ghost"
            style={styles.resetButton}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { marginBottom: Spacing.xl },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: 12,
    backgroundColor: Colors.background.primary,
  },
  dropdownText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: 12,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent.purple,
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.sm,
  },
  cameraButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  photoContainer: { alignItems: 'center', gap: Spacing.md },
  photoWrapper: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removePhotoButtonText: { color: '#fff', fontSize: 16, lineHeight: 16 },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: Colors.neutral.gray200,
  },
  submitSection: { marginTop: Spacing.lg },
  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.status.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  submitButton: { marginBottom: Spacing.md },
  resetButton: { marginTop: Spacing.sm },
});
