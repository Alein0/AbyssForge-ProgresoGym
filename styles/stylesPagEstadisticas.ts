import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
    paddingTop: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4682B4',
    marginBottom: 20,
    paddingTop: 90,
  },
  dropdownContainer: {
    width: '85%',
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4682B4',
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownArrow: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#4682B4',
    borderRadius: 8,
    marginTop: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  statsBox: {
    width: '100%',
    minHeight: 250,
    backgroundColor: '#232A34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#4682B4',
    padding: 8,
    marginBottom: 80,
    alignSelf: 'center'
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginVertical: 18,
    textAlign: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: '#232A34',
    borderRadius: 18,
    marginBottom: 28,
    marginTop: 8,
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    alignItems: "center"
  },
  chart: {
    marginVertical: 12,
    borderRadius: 18,
    alignSelf: "center"
  },
  navbarFix: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: '#232A34',
    paddingBottom: 2,
    zIndex: 9,
  }
});

export default styles;
