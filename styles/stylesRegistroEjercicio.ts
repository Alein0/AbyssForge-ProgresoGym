import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
         backgroundColor: '#1d1d1d', // Fondo negro
    paddingBottom: 80,
        paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  backgroundColor: '#1d1d1d', // Fondo negro
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4682B4',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseTitle: {
    color: '#4682B4',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 25,
  },
  field: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4682B4',
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  fieldLabel: {
    color: '#fff',
    fontSize: 16,
  },
  fieldUnit: {
    color: '#999',
    fontSize: 14,
  },
  input: {
     backgroundColor: '#2e2e2eff', // Fondo negro
    color: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 15,
  },
});

export default styles;
