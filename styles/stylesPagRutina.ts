import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    paddingTop: 55,
   
    
  },
 header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',   // 🔹 Centra todo
  width: "100%",
  paddingVertical: 10,
  marginBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#4682B4',
},

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
rutinaCard: {
  width: '85%',
  height: 100,
  backgroundColor: '#1A1A1A',
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#4682B4',
  marginVertical: 10,
  flexDirection: "row",      // iconos y textos alineados a lo ancho
  alignItems: "center",
  alignSelf: "center",
  paddingHorizontal: 8,
},

  rutinaNombre: {
    fontSize: 18,
    color: '#fff',
    fontWeight: "600",
    
  },
  rutinaCantidad: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },

  menuOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.55)',
  justifyContent: 'center',
  alignItems: 'center',
},
menuBox: {
  width: '85%',
  backgroundColor: '#232740',
  borderRadius: 12,
  padding: 20,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 8,
  elevation: 5,
},
menuTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#fff',
  marginBottom: 8,
  textAlign: 'center',
},
menuVacio: {
  color: '#bbb',
  fontSize: 15,
  textAlign: 'center',
  marginVertical: 12,
},
menuEjercicio: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#282848',
  borderRadius: 7,
  padding: 10,
  marginVertical: 8,
},
ejercicioNombre: {
  fontSize: 16,
  color: '#fff',
  fontWeight: '700',
},
ejercicioDato: {
  fontSize: 13,
  color: '#bbb',
  marginTop: 2,
},

});

export default styles;
